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
ALTER TABLE users add column genero varchar (15)
ALTER TABLE users add column ocupacion varchar (30)
ALTER TABLE Users ALTER COLUMN rol SET DEFAULT 'usuario';

UPDATE Users
SET
    ocupacion = 'estudiante'
WHERE id = '50813483-f74e-4c98-999b-e92e090cd8b4';


select * from users
drop table User_permissions

CREATE TABLE User_Permissions (
  user_id UUID REFERENCES Users(id) ON DELETE CASCADE,
  field_name TEXT CHECK (field_name IN (
      'nombre', 'email', 'cedula', 'telefono', 'direccion', 'fecha_nacimiento','ocupacion', 'genero', 'rol'
  )),
  is_visible BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, field_name)
);



select * from User_Permissions;

select view

INSERT INTO User_Permissions (user_id, field_name, is_visible) VALUES
    ('50813483-f74e-4c98-999b-e92e090cd8b4', 'nombre', TRUE),
    ('50813483-f74e-4c98-999b-e92e090cd8b4', 'email', TRUE),
    ('50813483-f74e-4c98-999b-e92e090cd8b4', 'cedula', FALSE),
    ('50813483-f74e-4c98-999b-e92e090cd8b4', 'telefono', FALSE),
    ('50813483-f74e-4c98-999b-e92e090cd8b4', 'direccion', FALSE),
    ('50813483-f74e-4c98-999b-e92e090cd8b4', 'fecha_nacimiento', FALSE),
    ('50813483-f74e-4c98-999b-e92e090cd8b4', 'rol', TRUE);

INSERT INTO User_Permissions (user_id, field_name, is_visible) VALUES
    ('bf70929e-8f11-44df-865d-569953cbf217', 'nombre', TRUE),
    ('bf70929e-8f11-44df-865d-569953cbf217', 'email', TRUE),
    ('bf70929e-8f11-44df-865d-569953cbf217', 'cedula', TRUE),
    ('bf70929e-8f11-44df-865d-569953cbf217', 'telefono', TRUE),
    ('bf70929e-8f11-44df-865d-569953cbf217', 'direccion', TRUE),
    ('bf70929e-8f11-44df-865d-569953cbf217', 'fecha_nacimiento', TRUE),
    ('bf70929e-8f11-44df-865d-569953cbf217', 'genero', TRUE),
    ('bf70929e-8f11-44df-865d-569953cbf217', 'ocupacion', TRUE),
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

SELECT update_user_permission('50813483-f74e-4c98-999b-e92e090cd8b4', 'cedula', TRUE);

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
                  AND p.field_name = 'genero'
                  AND p.is_visible = TRUE
            ) THEN u.genero
            ELSE 'No Disponible'
        END AS genero,
        CASE
            WHEN EXISTS (
                SELECT 1 FROM User_Permissions p
                WHERE p.user_id = u.id
                  AND p.field_name = 'ocupacion'
                  AND p.is_visible = TRUE
            ) THEN u.ocupacion
            ELSE 'No Disponible'
        END AS ocupacion,

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

DELETE FROM users WHERE id = 'a3d38567-8105-4245-b0af-af93d17d26d7'
DELETE FROM users WHERE id = 'f6ccb905-dee1-4e0f-b5f3-6d71086e5502'
DELETE FROM users WHERE id = '1accc59e-f817-4aa0-9e03-9a03abe11dc7'
