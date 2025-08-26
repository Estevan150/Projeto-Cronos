# Usa a imagem base do Python
FROM python:3.11-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo de dependências para o contêiner
COPY requirements.txt .

# Instala TODAS as dependências listadas no requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o resto do código do backend para o contêiner
COPY . .

# Garante que as importações (como 'from core...') funcionem
ENV PYTHONPATH=/app

# Expõe a porta e define o comando para rodar a aplicação
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]