# Utiliza Python 3.9 como imagen base
FROM python:3.9-slim

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo de requisitos a la imagen
COPY requirements.txt .

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto donde Flask correrá
EXPOSE 5000

# Establecer la variable de entorno para Flask
ENV FLASK_APP=app.py

# Comando para ejecutar la aplicación
CMD ["flask", "run", "--host=0.0.0.0"]
