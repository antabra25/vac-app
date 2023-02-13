FROM  python:3.9.2
WORKDIR /api
COPY ./requirements.txt /api/requirements.txt
RUN pip install  -r /api/requirements.txt
COPY . .
RUN apt update && apt install -y libzbar0
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
