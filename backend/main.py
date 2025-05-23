from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
import base64
import numpy as np
import cv2
from utils.preprocessing import preprocess_image
from utils.pretrained_models import k_nearest_neighbour, artificial_neural_network, k_means_clustering,support_vector_machine

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True, 
    allow_methods=["*"],    
    allow_headers=["*"],    
)


@app.post("/api/upload")
async def predict_image(image:dict):
    print('hellllllo')
    image_base64 = image.get("image")
    if not image_base64:
        raise HTTPException(status_code=400, detail="No image data found")
    header, image_base64 = image_base64.split(",", 1)
    image_bytes = base64.b64decode(image_base64)
    np_array = np.frombuffer(image_bytes, dtype=np.uint8)
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    processed_image = preprocess_image(img)   
    predicted_number_ann =  artificial_neural_network(processed_image)
    print('predicted number ann',predicted_number_ann)
    predicted_number_knn = k_nearest_neighbour(processed_image)
    predicted_number_kmeans = k_means_clustering(processed_image)
    predicted_number_svm = support_vector_machine(processed_image)
    print('predicted number knn ',predicted_number_knn)
    print('predicted number kmeans ',predicted_number_kmeans)
    print('predicted number svm ',predicted_number_svm)
    return [
        {"model_name": "Artificial Neural Network", "prediction": int(predicted_number_ann), 'accuracy': 0.97},
        {"model_name": "K Nearest Neighbour", "prediction": int(predicted_number_knn), 'accuracy': 0.96},
        {"model_name": "K Means Clustering", "prediction": int(predicted_number_kmeans), 'accuracy': 0.65},
        {"model_name": "Support Vector Machine", "prediction": int(predicted_number_svm), 'accuracy': 0.96}
    ]
