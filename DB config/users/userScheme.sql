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

select * from users

ALTER TABLE Users add column rol varchar(10)


