import numpy as np
import joblib
import os
from tensorflow.keras.models import load_model

def k_nearest_neighbour(image):
    # image = image.reshape(1, -1)
    knn = joblib.load("models/knn_model.pkl")
    prediction = knn.predict(image)
    return prediction[0]

def k_means_clustering(image):
    mapping = {0: 6, 1: 9, 2: 3, 3: 7, 4: 2, 5: 1, 6: 9, 7: 8, 8: 1, 9: 4}
    # image = image.reshape(1, -1)
    kmeans = joblib.load("models/kmeans_model.pkl")
    prediction = kmeans.predict(image)
    prediction = mapping[prediction[0]]
    return prediction

def artificial_neural_network(image):
    # image = image.reshape(1, -1)
    ann = load_model("models/ann_model.keras")
    prediction = ann.predict(image)
    return prediction.argmax(axis=1)[0]

def support_vector_machine(image):
    # image = image.reshape(1, -1)
    svm = joblib.load("models/svm_model.pkl")
    prediction = svm.predict(image)
    return prediction[0]
