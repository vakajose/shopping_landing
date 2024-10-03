# Utilizar una imagen base de Python
FROM python:3.9-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de requisitos
COPY requirements.txt .

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 5000

# Comando para ejecutar la aplicación
#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port 5000"]
