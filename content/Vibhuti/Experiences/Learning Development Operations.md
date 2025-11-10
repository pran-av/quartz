---
date: 2025-02-17
tags:
  - "#engineering"
---
### Docker Files

A docker file is a set of instructions that specifies dependencies and operational commands required to run a specific application over an isolated container.

Every version of a docker file creates an *Image* - images are like blueprints based on which *Containers* are built. These containers run our apps in isolation over a virtual machine running somewhere in the cloud.

Images are made up of *Layers* of instructions. These layers are executed one by one. We can additional run an executable script as through these layers.

Built containers are registered with an hosting service, which can provide the infrastructure to run the app 24*7.

### Deploying to Google Cloud

1. Signup to GCloud
2. Authentication
	1. Check for `gcloud auth list`
	2. Verify Project config `gcloud config get-value project`
3. Setup a Project
	4. `gcloud projects create travel-planner-api-2024 --name="Travel Planner API"`
	5. `gcloud config set project travel-planner-api-2024`
4. Add billing information to the project
	1. Open project in google cloud to get a prompt to choose billing account
5. Enable basic functionalities required for deployments
	1. `gcloud services enable cloudbuild.googleapis.com run.googleapis.com sql-component.googleapis.com sqladmin.googleapis.com redis.googleapis.com secretmanager.googleapis.com vpcaccess.googleapis.com`
6. Setup Database Instance (if database is being used)
	1. Verify Instance `gcloud sql instances list`
	2. Create Instance`gcloud sql instances create travel-planner-db --database-version=POSTGRES_15 --region=us-central1 --tier=db-f1-micro --storage-type=SSD --storage-size=10GB --root-password={password}`
	3. Create user and set a password for the user `gcloud sql users create travel_planner --instance=travel-planner-db --password={password}`
	4. Create database `cloud sql databases create travel_planner --instance=travel-planner-db`
	5. Setup/Migrate database - can use alembic (Alembic is a versioning tool for databases - used in python projects)
7. Setup Redis Instance (If rate limiting is required)
		1. Create Instance `gcloud redis instances create travel-planner-redis --size=1 --region=us-central1 --redis-version=redis_7_0`
		2. No password required if `transitEncryptionMode: DISABLED`
8. Store Secret Keys in Secret Manager
	1. `echo "your-secret-key-here" | gcloud secrets create travel-api-secret-key --data-file=-`
9. Connect the Github repo in Cloud Build
10. Create a Cloud Build
11. Run the Build
	1. ```gcloud run deploy travel-planning-api --source . --region us-central1 --platform managed --allow-unauthenticated --memory 2Gi --cpu 2 --min-instances 0 --max-instances 10 --port 8080 --timeout 300 --concurrency 80 --execution-environment gen2 --cpu-throttling --service-account travel-planning-api-sa@travel-planning-api-2024.iam.gserviceaccount.com```
12. Post Deployment Health Check
	2. `gcloud run services describe travel-planning-api --region us-central1 --format='value(status.url)'`
	3. Root domain health check `curl -v https://{baseurl}/_ah/health`
	4. Specific API health check `curl -X POST 'https://{baseurl}/api/v1/travel-plan/generate' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{"destination": "New Delhi", "places_of_interest": "temples"}'`
13. If Curl requests fail, we can run following commands to debug the issue,
	1. Verify the latest build service URL
		1. `gcloud run services describe travel-planning-api --platform managed --region us-central1 | grep URL`
	2. Add `-v` to the curl to get verbose
		1. `curl -v -X POST https://{baseurl}/api/v1/travel-plan/generate -H "Content-Type: application/json" -d '{"destination": "Khandala", "places_of_interest": "nature"}'`
	3. Look at Cloud Logs
		1. `gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=travel-planning-api AND severity>=WARNING" --limit 20 | cat`

### Nginx

A programming interface that communicates with the servers. Nginx handles routing, caching, and compression operations to ensure delivery to all requests.

### WSGI and ASGI

Web Server Gateway Interface (WSGI) is a middleware between Server (Nginx) and Web Application that employs Workers to handle processes during request-response cycles.

In case of ASGI the Workers can operate processes asynchronously, while in WSGI concurrency is preserved (as in the process 2 will start after process 1 is completed). ASGI can handle I/O operations better than WSGI.

These gateways are specific to python applications. Frameworks like Django and Flask operate on WSGI configuration. While FastAPI operates on ASGI configuration.

Number of Workers should be subject to the CPU constraints, a good rule of thumb is to use number of workers equal to -> `(2 x $num_cores) + 1` 

### Gunicorn and Uvicorn

Gunicorn works on WSGI model where multiple workers handle one process at a time. Uvicorn works on ASGI model where a single worker can handle multiple processes concurrently.

Gunicorn is simple to setup and has better logging operations, hence its better to use Gunicorn with Uvicorn workers for asynchronous application requirements.