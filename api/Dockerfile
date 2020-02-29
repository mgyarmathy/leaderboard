FROM python:3.8-slim
EXPOSE 8080
WORKDIR /app
COPY . /app
RUN pip3 install -r requirements.txt
CMD ["python", "main.py"]
