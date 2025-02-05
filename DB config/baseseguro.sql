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
-- eliminar usuarios
delete from users where id = 'cf4613ef-534b-48cb-a528-6f254dbb5646';
delete from users where id = '9df84ac9-f78c-4474-8f29-f2004e70b55c';
delete from users where id = 'd965e5ac-fe9a-4749-b830-2da2ae0fc155';
delete from users where id = 'c83f250f-818a-42a4-b9c9-54036250427f';
delete from users where id = '4674e6ea-b1b8-4875-90bf-d0a1133b1f70';
delete from users where id = '600c5354-7158-4069-b265-1f8207bf87d4';

select * from users;

CREATE TABLE User_Permissions (
  user_id UUID REFERENCES Users(id) ON DELETE CASCADE,
  field_name TEXT CHECK (field_name IN (
      'nombre', 'email', 'cedula', 'telefono', 'direccion', 'fecha_nacimiento','ocupacion', 'genero', 'rol'
  )),
  is_visible BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, field_name)
);

ALTER table User_Permissions add column expiration_date date not null;
--
select * from User_Permissions;

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

-- Crear la vista para mostrar los datos permitidos
CREATE OR REPLACE VIEW public_users AS
SELECT
    u.id,
    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'nombre'
            AND p.is_visible = TRUE
            AND (p.expiration_date IS NULL OR p.expiration_date >= NOW()) -- Verifica que no haya expirado
        ) THEN u.nombre
        ELSE 'Anonimizado'
    END AS nombre,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'email'
            AND p.is_visible = TRUE
            AND (p.expiration_date IS NULL OR p.expiration_date >= NOW())
        ) THEN u.email
        ELSE 'anonimizado@email.com'
    END AS email,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'cedula'
            AND p.is_visible = TRUE
            AND (p.expiration_date IS NULL OR p.expiration_date >= NOW())
        ) THEN u.cedula
        ELSE 'XXXXXXXXXX'
    END AS cedula,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'telefono'
            AND p.is_visible = TRUE
            AND (p.expiration_date IS NULL OR p.expiration_date >= NOW())
        ) THEN u.telefono
        ELSE '0000000000'
    END AS telefono,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'direccion'
            AND p.is_visible = TRUE
            AND (p.expiration_date IS NULL OR p.expiration_date >= NOW())
        ) THEN u.direccion
        ELSE 'Dirección Oculta'
    END AS direccion,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'fecha_nacimiento'
            AND p.is_visible = TRUE
            AND (p.expiration_date IS NULL OR p.expiration_date >= NOW())
        ) THEN u.fecha_nacimiento
        ELSE NULL
    END AS fecha_nacimiento,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'genero'
            AND p.is_visible = TRUE
            AND (p.expiration_date IS NULL OR p.expiration_date >= NOW())
        ) THEN u.genero
        ELSE 'No Disponible'
    END AS genero,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'ocupacion'
            AND p.is_visible = TRUE
            AND (p.expiration_date IS NULL OR p.expiration_date >= NOW())
        ) THEN u.ocupacion
        ELSE 'No Disponible'
    END AS ocupacion,

    CASE
        WHEN EXISTS (
            SELECT 1 FROM User_Permissions p
            WHERE p.user_id = u.id
            AND p.field_name = 'rol'
            AND p.is_visible = TRUE
            AND (p.expiration_date IS NULL OR p.expiration_date >= NOW())
        ) THEN u.rol
        ELSE 'No Disponible'
    END AS rol

FROM Users u;


-- Tablas de auditoría
-- 1. Tabla de auditoría para Users
CREATE TABLE Users_Audit (
    audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action_type VARCHAR(20) NOT NULL CHECK (action_type IN ('INSERT', 'UPDATE', 'DELETE', 'LOGIN_ATTEMPT')),
    field_name VARCHAR(100),
    old_value TEXT,
    new_value TEXT,
    ip_address INET,
    session_id TEXT,
    modified_at TIMESTAMP DEFAULT NOW()
);

-- 2. Tabla para auditar visualizaciones
CREATE TABLE Users_View_Audit (
    audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    fields_viewed TEXT[],
    ip_address INET,
    session_id TEXT,
    viewed_at TIMESTAMP DEFAULT NOW()
);

-- 3. Tabla para auditar permisos
CREATE TABLE Permissions_Audit (
    audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    field_name TEXT,
    old_is_visible BOOLEAN,
    new_is_visible BOOLEAN,
    old_expiration_date DATE,
    new_expiration_date DATE,
    ip_address INET,
    session_id TEXT,
    modified_at TIMESTAMP DEFAULT NOW()
);

-- 4. Función para auditar cambios en Users
CREATE OR REPLACE FUNCTION audit_users_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO Users_Audit (
            user_id,
            action_type,
            new_value,
            ip_address,
            session_id
        ) VALUES (
            NEW.id,
            'INSERT',
            row_to_json(NEW)::text,
            inet_client_addr(),
            pg_backend_pid()::text
        );
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO Users_Audit (
            user_id,
            action_type,
            old_value,
            new_value,
            ip_address,
            session_id
        ) VALUES (
            NEW.id,
            'UPDATE',
            row_to_json(OLD)::text,
            row_to_json(NEW)::text,
            inet_client_addr(),
            pg_backend_pid()::text
        );
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO Users_Audit (
            user_id,
            action_type,
            old_value,
            ip_address,
            session_id
        ) VALUES (
            OLD.id,
            'DELETE',
            row_to_json(OLD)::text,
            inet_client_addr(),
            pg_backend_pid()::text
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Trigger para Users
CREATE TRIGGER users_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON Users
FOR EACH ROW EXECUTE FUNCTION audit_users_changes();

-- 6. Función para auditar permisos
CREATE OR REPLACE FUNCTION audit_permissions_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO Permissions_Audit (
        user_id,
        field_name,
        old_is_visible,
        new_is_visible,
        old_expiration_date,
        new_expiration_date,
        ip_address,
        session_id
    ) VALUES (
        COALESCE(NEW.user_id, OLD.user_id),
        COALESCE(NEW.field_name, OLD.field_name),
        OLD.is_visible,
        NEW.is_visible,
        COALESCE(OLD.expiration_date, NULL),
        COALESCE(NEW.expiration_date, NULL),
        inet_client_addr(),
        pg_backend_pid()::text
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Trigger para Permisos
CREATE TRIGGER permissions_audit_trigger
AFTER UPDATE ON User_Permissions
FOR EACH ROW EXECUTE FUNCTION audit_permissions_changes();

-- 8. Función para intentos de login
CREATE OR REPLACE FUNCTION attempt_login(
    email_input VARCHAR,
    password_input VARCHAR
) RETURNS TABLE (
    id UUID,
    nombre VARCHAR,
    email VARCHAR,
    rol VARCHAR
) AS $$
BEGIN
    -- Registrar el intento
    INSERT INTO Users_Audit (
        action_type,
        field_name,
        new_value,
        ip_address,
        session_id
    ) VALUES (
        'LOGIN_ATTEMPT',
        'email',
        email_input,
        inet_client_addr(),
        pg_backend_pid()::text
    );

    -- Realizar la búsqueda
    RETURN QUERY
    SELECT
        u.id,
        u.nombre,
        u.email,
        u.rol
    FROM Users u
    WHERE u.email = email_input AND u.password = password_input;
END;
$$ LANGUAGE plpgsql;

-- 9. Función para registrar visualizaciones y retornar datos
CREATE OR REPLACE FUNCTION view_user_data(user_id_input UUID)
RETURNS TABLE (
    id UUID,
    nombre TEXT,
    email TEXT,
    cedula TEXT,
    telefono TEXT,
    direccion TEXT,
    fecha_nacimiento DATE,
    genero TEXT,
    ocupacion TEXT,
    rol TEXT
) AS $$
BEGIN
    -- Registrar la visualización
    INSERT INTO Users_View_Audit (
        user_id,
        fields_viewed,
        ip_address,
        session_id
    )
    SELECT
        user_id_input,
        ARRAY(
            SELECT column_name::text
            FROM information_schema.columns
            WHERE table_name = 'public_users'
            AND table_schema = 'public'
        ),
        inet_client_addr(),
        pg_backend_pid()::text;

    -- Retornar los datos de la vista
    RETURN QUERY
    SELECT * FROM public_users
    WHERE id = user_id_input;
END;
$$ LANGUAGE plpgsql;

-- 10. Índices para mejorar rendimiento
CREATE INDEX idx_users_audit_timestamp ON Users_Audit(modified_at);
CREATE INDEX idx_users_audit_action ON Users_Audit(action_type);
CREATE INDEX idx_view_audit_timestamp ON Users_View_Audit(viewed_at);
CREATE INDEX idx_permissions_audit_timestamp ON Permissions_Audit(modified_at);

--DROOPS
DROP TRIGGER IF EXISTS users_audit_trigger ON Users;
DROP TRIGGER IF EXISTS permissions_audit_trigger ON User_Permissions;
DROP TRIGGER IF EXISTS login_audit_trigger ON Users;
DROP TRIGGER IF EXISTS view_audit_trigger ON public_users;

-- Eliminar funciones
DROP FUNCTION IF EXISTS audit_users_changes();
DROP FUNCTION IF EXISTS audit_permissions_changes();
DROP FUNCTION IF EXISTS audit_login_attempt();
DROP FUNCTION IF EXISTS log_view_audit();

-- Eliminar índices
DROP INDEX IF EXISTS idx_users_audit_timestamp;
DROP INDEX IF EXISTS idx_users_audit_action;
DROP INDEX IF EXISTS idx_view_audit_timestamp;
DROP INDEX IF EXISTS idx_permissions_audit_timestamp;

-- Eliminar tablas
DROP TABLE IF EXISTS Users_Audit CASCADE;
DROP TABLE IF EXISTS Users_View_Audit CASCADE;
DROP TABLE IF EXISTS Permissions_Audit CASCADE;