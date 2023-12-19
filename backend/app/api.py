from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# @app.get("/", tags=["root"])
# async def read_root() -> dict:
#     return {"message": "Welcome to the matrix calculator."}

@app.post("/determinant", tags=["determinant"])
async def det(arr):
    #return np.linalg.det(np.array(arr))
    #print (arr)
    return {"hello": "hi"}