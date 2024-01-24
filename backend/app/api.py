from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import sympy as sp
import scipy
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:3000"
]
class JokeInput(BaseModel):
    text: str

class Input2(BaseModel):
    text1: str
    text2: str
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to the matrix calculator."}

# @app.post("/det", tags=["determinant"])
# async def det(arr):
#     print(arr)
#     # return np.linalg.det(np.array(arr))

# @app.post("/det", tags=["Determinant"])
# async def det(joke_input: JokeInput):
#     # print(joke_input.dict())
#     # Your processing logic here
#     return {"status": "success"}


def convert_to_1d_array(numpy_2d_array):
   
    flattened_array = numpy_2d_array.flatten()

    # Convert the NumPy array to a normal Python list
    normal_list = flattened_array.tolist()

    return normal_list

# Example usage:
# numpy_2d_array = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
# result = convert_to_1d_array(numpy_2d_array)
# print(result)



#problem 1
@app.post("/add", tags=["Addition"])
async def addition(joke_input_1: Input2) :
    try:
        m1 = np.matrix(joke_input_1.text1.replace('\n', ';'))
        m2 = np.matrix(joke_input_1.text2.replace('\n', ';'))
        return convert_to_1d_array((np.round(m1+m2,4)))
    except ValueError:
        return ("Matrices dimensions not compatible for addition")

#problem 1
@app.post("/sub", tags=["Subtraction"])
async def subtraction(joke_input_1: Input2):
    try:
        m1 = np.matrix(joke_input_1.text1.replace('\n', ';'))
        m2 = np.matrix(joke_input_1.text2.replace('\n', ';'))
        return convert_to_1d_array(m1-m2)
    except ValueError:
        return ("Matrices dimensions not compatible for subtraction")

#problem 2
@app.post("/mul", tags=["Multiplication"])
async def multiplication(joke_input_1: Input2):
    try:
        m1 = np.matrix(joke_input_1.text1.replace('\n', ';'))
        m2 = np.matrix(joke_input_1.text2.replace('\n', ';'))
        return convert_to_1d_array(np.dot(m1,m2))
    except ValueError:
        return ("Matrices dimensions not compatible for multiplication")

#problem 3
@app.post("/div", tags=["Division"])
async def division(joke_input_1: Input2):
    try:
        m1 = np.matrix(joke_input_1.text1.replace('\n', ';'))
        m2 = np.matrix(joke_input_1.text2.replace('\n', ';'))
        return [convert_to_1d_array((m1*np.linalg.inv(m2)).round(4))]
        
    except:
        return ("Matrices not compatible for division")

#problem 4
@app.post("/pow", tags=["Power"])
async def power(joke_input: JokeInput, p: int):
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        return convert_to_1d_array(np.linalg.matrix_power(m,p))
    except:
        return ("Matrix not compatible for power")

#problem 5
@app.post("/tsp", tags=["Transpose"])
async def transpose(joke_input: JokeInput):
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        return convert_to_1d_array(np.matrix.transpose(m))
    except:
        return ("Matrix not compatible for transpose")

# problem 6
@app.post("/det", tags=["Determinant"])
async def determinant(joke_input: JokeInput):
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        return round(np.linalg.det(m),4)
    except:
        return ("Matrix not compatible for determinant")


## adjoint pending for review
#problem 7
@app.post("/adj", tags=["Adjoint"])
async def adjoint(joke_input: JokeInput):
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        minors = np.zeros_like(m, dtype=float)
        for i in range(m.shape[0]):
            for j in range(m.shape[1]):
                sub_matrix = np.delete(np.delete(m, i, axis=0), j, axis=1)
                minors[i, j] = ((-1) ** (i + j)) * np.linalg.det(sub_matrix) 
        return convert_to_1d_array(minors.T)
    except:
        return ("Matrix not compatible for adjoint")

#problem 8
@app.post("/mnr", tags=["Minor"])
async def minor(joke_input: JokeInput) :
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        n = m.shape[0]
        minor_matrix = np.zeros((n, n))

        for i in range(n):
            for j in range(n):
                submatrix = np.delete(np.delete(m, i, axis=0), j, axis=1)
                minor_matrix[i, j] = np.linalg.det(submatrix)

        return [convert_to_1d_array(minor_matrix)]
    except:
        return ("Matrix not compatible for minor")

#problem 9
@app.post("/cft", tags=["Cofactor"])
async def cofactor(joke_input: JokeInput) :
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        n = m.shape[0]
        cofactor_matrix = np.zeros((n, n))

        for i in range(n):
            for j in range(n):
                submatrix = np.delete(np.delete(m, i, axis=0), j, axis=1)
                cofactor_matrix[i, j] = ((-1)**(i+j))*np.linalg.det(submatrix)
        return [convert_to_1d_array(cofactor_matrix)]
    except:
        return ("Matrix not compatible for cofactor")

#problem 10
@app.post("/inv", tags=["Inverse"])
async def cofactor(joke_input: JokeInput) :
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        return convert_to_1d_array(np.linalg.inv(m))
    except:
        return ("The matrix is singular and doesnt have an inverse")

#problem 11
@app.post("/trc", tags=["Trace"])
async def trace(joke_input: JokeInput) :
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        if (m.shape[0]!= m.shape[1]):
            raise ValueError
        return (float)(m.trace())
    except:
        return ("Matrix not compatible for trace")
        
#problem 12
@app.post("/chp", tags=["CharacteristicPolynomial"])
async def charpoly(joke_input: JokeInput) :
    try:
        m1 = np.matrix(joke_input.text.replace('\n', ';'))
        ev= np.linalg.eigvals(m1)
        eva=[]
        for i in ev:
            eva.append(i)
        pol=np.polynomial.polynomial.polyfromroots(eva)
        ans=""
        for i in range(len(pol)-1,-1,-1):
            if pol[i]!=0:
                ans = ans + "  " + str(round(pol[i],4))+' x^'+str(i)
            if i>0:
                ans+=" + "
        if ans=="":
            return 0
        return ans
    except:
        return ("Matrix not compatible for characteristic polynomial")

#problem 13 - returning eigenvalues in the form of list
@app.post("/evl", tags=["EigenValue"])
async def eigval(joke_input: JokeInput) :
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        ev= np.linalg.eigvals(m)
        eva = [[round(x.real, 5), round(x.imag, 5)] for x in ev]
        return eva
        
    except:
        return ("Matrix not compatible for eigen value")

#problem 14
@app.post("/evt", tags=["EigenVector"])
async def eigvct(joke_input: JokeInput) :
    try:
        m = np.array([list(map(float, row.split())) for row in joke_input.text.split('\n')])
        e, ev = np.linalg.eig(m)
        ev = ev.T

        for i in range(len(ev)):
            divisor = ev[i, i]
            ev[i] /= divisor if divisor != 0 else 1.0
        ev = ev.round(4)
        size=(int)(ev.size**(0.5))
        ev = [[num.real, num.imag] for num in ev.flatten()]
        # Separate the vectors into individual sublists
        ev = [ev[i:i+size] for i in range(0, len(ev), size)]

        # Wrap each vector in its own sublist
        ev = [vector for vector in ev]
        return ev
    except:
        return ("Matrix not compatible for Eigen Vector Calculation") 

#problem 15
@app.post("/ref", tags=["RowEchelonForm"])
async def rowechfrm(joke_input: JokeInput) :
    try:
        matrix=np.matrix(joke_input.text.replace("\n", ","))
        m, n = matrix.shape
        lead = 0
        for r in range(m):
            if lead >= n:
                break
            i = r
            while matrix[i, lead] == 0:
                i += 1
                if i == m:
                    i = r
                    lead += 1
                    if n == lead:
                        break
            matrix[[r, i]] = matrix[[i, r]]
            if matrix[r, lead] != 0:
                matrix[r] = matrix[r] / matrix[r, lead]
            for i in range(m):
                if i != r:
                    ratio = matrix[i, lead]
                    matrix[i] = matrix[i] - ratio * matrix[r]
            lead += 1
        return convert_to_1d_array(matrix)      
    except:
        return ("Matrix not compatible for row reduced form")

#problem 16
@app.post("/rre", tags=["RowReducedEchelon"])
async def rowredech(joke_input: JokeInput) :
    try:
        matrix=np.matrix(joke_input.text.replace("\n", ","))
        m, n = matrix.shape
        lead = 0
        for r in range(m):
            if lead >= n:
                break
            i = r
            while matrix[i, lead] == 0:
                i += 1
                if i == m:
                    i = r
                    lead += 1
                    if n == lead:
                        break
            matrix[[r, i]] = matrix[[i, r]]
            if matrix[r, lead] != 0:
                matrix[r] = matrix[r] / matrix[r, lead]
            for i in range(m):
                if i != r:
                    ratio = matrix[i, lead]
                    matrix[i] = matrix[i] - ratio * matrix[r]
            lead += 1
        return convert_to_1d_array(matrix)     
    except:
        return ("Matrix not compatible for row reduced echelon form")

#problem 17
@app.post("/lud", tags=["LUDecomposition"])
async def ludecomp(joke_input: JokeInput) :
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        A = scipy.array(m)
        P,L,U = scipy.linalg.lu(A)
        return [convert_to_1d_array(P),convert_to_1d_array(L),convert_to_1d_array(U)]       
    except:
        return ("Matrix not compatible for lu decomposition")

#problem 18
@app.post("/dig", tags=["Diagonalise"])
async def diag(joke_input: JokeInput) :
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        return [convert_to_1d_array((np.diag(m)))]      
    except:
        return ("Matrix not compatible for diagonalisation")

#problem 19
@app.post("/dme", tags=["Dominant Eigenvalue"])
async def domeigval(joke_input: JokeInput) :
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        ev= np.linalg.eigvals(m)
        m = 0
        for i in ev:
            if (abs(i.round(4))>m):
                m = i.round(4)
        return m
    except:
        return ("Matrix not compatible for dominant eigen value computation")

#problem 20
@app.post("/svd", tags=["SingularValueDecomposition"])
async def svd(joke_input: JokeInput) :
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        u,s,v = np.linalg.svd(m)
        u = u.round(4)
        s = s.round(4)
        v = v.round(4)
        return [convert_to_1d_array(u),convert_to_1d_array(np.diag(s)),convert_to_1d_array(v)]      
    except:
        
        return ("Matrix not compatible for singular value decomposition")

#TASK 2
@app.post("/sol", tags=["Solutiontolineareqn"])
async def diag(coeff_str: Input2) :
    try:
        A = np.matrix(coeff_str.text1.replace("\n",";"))
        B = np.matrix(coeff_str.text2.replace("\n",";"))
        X = np.linalg.inv(A).dot(B)
        return convert_to_1d_array(X)      
    except:
        return ("Matrices not compatible for solution")

#TASK 3

def isdiag(m):
    for i in range(m.shape[0]):
        for j in range(m.shape[1]):
            if (i!=j and m[i][j]!=0):
                return False
    return True

def isscal(m):
    for i in range(1,m.shape[0]):
        if (m[i][i]!=m[0][0]):
            return False
    return True

def isnull(m):
    for i in range(m.shape[0]):
        for j in range(m.shape[1]):
            if (m[i][j]!=0):
                return False
    return True

def isdiagdom(m):
    flag1 = True
    flag2 = True
    for i in range(m.shape[0]):
        s1 = 0
        for j in range(m.shape[0]):
            s1+=abs(m[i][j])
        if (abs(m[i][i])*2<s1):
            flag1= False
            flag2= False
            break
        if (abs(m[i][i])*2==s1):
            flag2 = False
    return flag1, flag2

@app.post("/typ", tags = ["TypeofMatrix"])
async def typ(joke_input: JokeInput) :
    try:
        m = np.matrix(joke_input.text.replace('\n', ';'))
        L = []
        row = np.shape[0]
        col = np.shape[1]
        if (row == 1 and col>1):
            L.append("Row")
        elif (row>1 and col==1):
            L.append("Column")
        if (row == col):
            L.append("Square")
            if np.linalg.det(m) == 0:
                L.append("Singular")
            else:
                L.append("Non-singular")

            ev= np.linalg.eigvals(m)
            s = set(ev)
            if (len(s) == 1 and 0 in s):
                L.append("Nilpotent")
            
            if (len(s)<3):
                flag = True
                for i in s:
                    if abs(i)!=1:
                        flag = False
                        break
                if flag:
                    L.append("Periodic")

            if (len(s) < len(ev)):
                L.append("Derogatory")

            if np.allclose(m, np.diag(np.diag(m))):
                L.append("Diagonal")
                if isscal(m):
                    L.append("Scalar")
                    if m[0][0]==1:
                        L.append("Identity")

            a,b = isdiagdom(m)
            if (b):
                L.append("Strictly Diagonally Dominant")
            if (a):
                L.append("Diagonally Dominant")

            t = np.matrix.transpose(m)
            if t == np.linalg.inv(m):
                L.append("Orthogonal") 
            if t == m:
                L.append("Symmetric")
                flag = True
                for i in s:
                    if i<=0:
                        flag = False
                        break
                if flag:
                    L.append("Positive definite")
                
                flag = True
                for i in s:
                    if i>=0:
                        flag = False
                        break
                if flag:
                    L.append("Negative definite")
                
            if t == (-m):
                L.append("Skew-Symmetric")
            m_sq = np.dot(m,m)
            if m_sq == m:
                L.append("Idempotent") 
            if np.array_equal(m_sq, np.identity(row)):
                L.append("Involuntary")

            if np.allclose(m, np.tril(m)):
                L.append("Lower Triangluar")
            if np.allclose(m, np.triu(m)):
                L.append("Upper Triangluar")
            



        elif (row<col):
            L.append("Horizontal")
        else:
            L.append("Veritcal")
        
        if isnull(m):
            L.append("Null")
        return [L]   

    except:
        return "Invalid Matrix"



#TASK 4
# Function to check if two matrices are equal
def are_matrices_equal(matrix1, matrix2):
    return np.array_equal(matrix1, matrix2)

# Properties of Matrix Addition
def matrix_addition_commutative(A, B):
    return are_matrices_equal(A + B, B + A)

def matrix_addition_associative(A, B, C):
    return are_matrices_equal(A + (B + C), (A + B) + C)

def matrix_additive_identity(A):
    O = np.zeros_like(A)
    return are_matrices_equal(A + O, A)

def matrix_additive_inverse(A):
    B = -A
    return are_matrices_equal(A + B, np.zeros_like(A))

# Properties of Matrix Multiplication
def matrix_multiplication_associative(A, B, C):
    return are_matrices_equal(A.dot(B).dot(C), A.dot(B.dot(C)))

def matrix_distribution(A, B, C):
    return are_matrices_equal(A.dot(B + C), A.dot(B) + A.dot(C))

# Properties of Scalar Multiplication
def scalar_multiplication_properties(r, s, A, B):
    result1 = are_matrices_equal(r * (s * A), (r * s) * A)
    result2 = are_matrices_equal((r + s) * A, r * A + s * A)
    result3 = are_matrices_equal(r * (A + B), r * A + r * B)
    result4 = are_matrices_equal(A * r * B, r * (A * B))
    return result1, result2, result3, result4

# Properties of the Transpose of a Matrix
def transpose_properties(A, B, r):
    result1 = are_matrices_equal(A.T.T, A)
    result2 = are_matrices_equal((A + B).T, A.T + B.T)
    result3 = are_matrices_equal((A.dot(B)).T, B.T.dot(A.T))
    result4 = are_matrices_equal((r * A).T, r * A.T)
    return result1, result2, result3, result4

# Properties of Determinants
def determinant_properties(A, r, k):
    result1 = np.linalg.det(A) == np.linalg.det(A.T)
    
    # Multiply a row or column by a scalar
    A_prime = A.copy()
    A_prime[:, 0] = k * A_prime[:, 0]
    result2 = np.linalg.det(A_prime) == k * np.linalg.det(A)
    
    # If all elements of any column or row are zero
    result3 = np.linalg.det(np.zeros_like(A)) == 0
    
    # If all elements above or below the diagonal are zero
    A_upper_triangular = np.triu(A)
    result4 = np.linalg.det(A_upper_triangular) == np.prod(np.diagonal(A_upper_triangular))
    
    return result1, result2, result3, result4
