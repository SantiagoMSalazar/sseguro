CREATE TABLE Users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(30) UNIQUE NOT NULL,
  email varchar(50) not null ,
  password VARCHAR(255) NOT NULL,
  cedula VARCHAR(10) not null,
  telefono varchar(10) not null ,
  direccion varchar(50) not null ,
  fecha_nacimiento date not null ,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
ALTER TABLE Users add column rol varchar(10)
ALTER TABLE Users ALTER COLUMN rol SET DEFAULT 'usuario';

UPDATE Users
SET
    rol = 'admin'
WHERE id = '50813483-f74e-4c98-999b-e92e090cd8b4';


select * from users

CREATE TABLE User_Permissions (
  user_id UUID REFERENCES Users(id) ON DELETE CASCADE,
  field_name TEXT CHECK (field_name IN (
      'nombre', 'email', 'cedula', 'telefono', 'direccion', 'fecha_nacimiento', 'rol'
  )),
  is_visible BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, field_name)
);



select * from User_Permissions


INSERT INTO User_Permissions (user_id, field_name, is_visible) VALUES
    ('c91ed824-e090-47ec-80f3-184863c91500', 'nombre', TRUE),
    ('c91ed824-e090-47ec-80f3-184863c91500', 'email', TRUE),
    ('c91ed824-e090-47ec-80f3-184863c91500', 'cedula', FALSE),
    ('c91ed824-e090-47ec-80f3-184863c91500', 'telefono', FALSE),
    ('c91ed824-e090-47ec-80f3-184863c91500', 'direccion', FALSE),
    ('c91ed824-e090-47ec-80f3-184863c91500', 'fecha_nacimiento', FALSE),
    ('c91ed824-e090-47ec-80f3-184863c91500', 'rol', TRUE);

INSERT INTO User_Permissions (user_id, field_name, is_visible) VALUES
    ('bf70929e-8f11-44df-865d-569953cbf217', 'nombre', TRUE),
    ('bf70929e-8f11-44df-865d-569953cbf217', 'email', TRUE),
    ('bf70929e-8f11-44df-865d-569953cbf217', 'cedula', TRUE),
    ('bf70929e-8f11-44df-865d-569953cbf217', 'telefono', TRUE),
    ('bf70929e-8f11-44df-865d-569953cbf217', 'direccion', TRUE),
    ('bf70929e-8f11-44df-865d-569953cbf217', 'fecha_nacimiento', TRUE),
    ('bf70929e-8f11-44df-865d-569953cbf217', 'rol', TRUE);

CREATE OR REPLACE FUNCTION update_user_permission(_user_id UUID, _field_name TEXT, _is_visible BOOLEAN)
RETURNS VOID AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM User_Permissions WHERE user_id = _user_id AND field_name = _field_name) THEN
        UPDATE User_Permissions
        SET is_visible = _is_visible
        WHERE user_id = _user_id AND field_name = _field_name;
    ELSE
        INSERT INTO User_Permissions (user_id, field_name, is_visible)
        VALUES (_user_id, _field_name, _is_visible);
    END IF;
END;
$$ LANGUAGE plpgsql;

SELECT update_user_permission('9bd0314d-ebab-42f4-b5c7-30c21d36e6be', 'email', TRUE);

-- Crear la vista

CREATE OR REPLACE VIEW public_users AS
SELECT
    u.id,
    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'nombre'
            AND p.is_visible = TRUE
        ) THEN u.nombre
        ELSE 'Anonimizado'
    END AS nombre,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'email'
            AND p.is_visible = TRUE
        ) THEN u.email
        ELSE 'anonimizado@email.com'
    END AS email,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'cedula'
            AND p.is_visible = TRUE
        ) THEN u.cedula
        ELSE 'XXXXXXXXXX'
    END AS cedula,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'telefono'
            AND p.is_visible = TRUE
        ) THEN u.telefono
        ELSE '0000000000'
    END AS telefono,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'direccion'
            AND p.is_visible = TRUE
        ) THEN u.direccion
        ELSE 'Dirección Oculta'
    END AS direccion,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'fecha_nacimiento'
            AND p.is_visible = TRUE
        ) THEN u.fecha_nacimiento
        ELSE NULL
    END AS fecha_nacimiento,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'rol'
            AND p.is_visible = TRUE
        ) THEN u.rol
        ELSE 'No Disponible'
    END AS rol

FROM Users u;

DELETE FROM users WHERE id = 'c80c231a-467a-42ad-8f23-2ff78e94ea3c'
