# create project
gcloud projects create PROJECT_ID --name="stockmanagement"

# set project 
gcloud config set project PROJECT_ID

# enable google cloud APIs
gcloud services enable run.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable containerregistry.googleapis.com

# create postgres instance
gcloud sql instances create my-postgres-instance --database-version=POSTGRES_13 --tier=db-f1-micro --region=us-central1
gcloud sql users set-password postgres --instance=my-postgres-instance --password=<PASSWORD>
gcloud sql databases create mydatabase --instance=my-postgres-instance

# build docker image
docker build -t gcr.io/PROJECT_ID/IMAGE_NAME .

# publish to container registry
docker push gcr.io/PROJECT_ID/IMAGE_NAME

# deploy
gcloud run deploy SERVICE_NAME \
    --image gcr.io/PROJECT_ID/IMAGE_NAME \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars CLOUD_SQL_CONNECTION_NAME=PROJECT_ID:us-central1:my-postgres-instance \
    --set-env-vars DB_USER=postgres \
    --set-env-vars DB_PASS=PASSWORD \
    --set-env-vars DB_NAME=databasename