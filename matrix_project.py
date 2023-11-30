import numpy as np


#part3
def matrix_division(matrix1,matrix2):
    try:
        return(np.dot(matrix1, np.linalg.inv(matrix2)))
        
    except np.linalg.LinAlgError:
        print("The matrix is singular and doesnt have an inverse")
        return None
        
#part8

def calculate_minor_matrix(matrix):
    n = matrix.shape[0]
    minor_matrix = np.zeros((n, n))

    for i in range(n):
        for j in range(n):
            submatrix = np.delete(np.delete(matrix, i, axis=0), j, axis=1)
            minor_matrix[i, j] = np.linalg.det(submatrix)

    return minor_matrix
    
#part9

def calculate_cofactor_matrix(matrix):
    n = matrix.shape[0]
    cofactor_matrix = np.zeros((n, n))

    for i in range(n):
        for j in range(n):
            submatrix = np.delete(np.delete(matrix, i, axis=0), j, axis=1)
            cofactor_matrix[i, j] = ((-1)**(i+j))*np.linalg.det(submatrix)

    return cofactor_matrix
    

#part10
def calculate_inverse(matrix):
    try:
        return(np.linalg.inv(matrix))
        
    except np.linalg.LinAlgError:
        print("The matrix is singular and doesnt have an inverse")
        return None
        
#part15/16

def row_echelon_form(matrix):
    m, n = matrix.shape  # Get the dimensions of the matrix (m rows, n columns)
    lead = 0  # Initialize the leading column index

    for r in range(m):
        i = r
        while matrix[i, lead] == 0:
            i += 1
            if i == m:
                i = r
                lead += 1
                if n == lead:
                    return
        
        matrix[[i, r]] = matrix[[r, i]]
        lv = matrix[r, lead]
        matrix[r] = matrix[r] / lv
        
        for i in range(m):
            if i != r:
                lv = matrix[i, lead]
                matrix[i] -= lv * matrix[r]
        
        lead += 1

m1 = np.array([[0,6,8],[0.5,0,0],[0,0.5,0]])
m2 = np.array([[10,20,30],[40,50,60],[1,2,3]])
#Problem1a
def Addition(m1,m2):
    if m1.shape != m2.shape:
        raise ValueError("Error: Dimension mismatched")
    else:
        for i in range(len(m1[0])):
            for j in range(len(m1)):
                print(m1[j][i],'+',m2[j][i],end='\t')
            print()
        return m1+m2

#print(Addition(m1,m2))
#Problem1b
def Subtraction(m1,m2):
    if m1.shape != m2.shape:
        raise ValueError("Error: Dimension mismatched")
    else:
        for i in range(len(m1[0])):
            for j in range(len(m1)):
                print(m1[j][i],'-',m2[j][i],end='\t')
            print()
        return m1-m2

#print(Subtraction(m1,m2))
#Problem2
def Multiplication(m1,m2):
    if m1.shape[1] != m2.shape[0]:
        raise ValueError("Error: Dimension mismatched")
    else:
        for i in range(len(m1)):
            for j in range(len(m1[0])):
                for k in range(len(m1[0])-1):
                    print(m1[i][k],'X',m2[k][j],sep='',end=' + ')
                print(m1[i][k+1],'X',m2[k+1][j],sep='',end='')
                print('\t',end='')
            print()
        return np.dot(m1,m2)
#Problem4
def Power(m1,p):
    if m1.shape[0]!=m1.shape[1]:
        raise ValueError("Error: Dimension mismatched")
    else:
        return np.linalg.matrix_power(m1,p)
        '''
        if p ==0:
            return np.identity(m1.shape[0])
        if p<0:
            return "give postitive power"
        res = m1
        power=1
        while 2*power<=p:
            res = np.dot(res,res)
            power*=2
            
            print("Matrix raised to",i,"is :")
            for j in range(len(m1[0])):
                for k in range(len(m1)):
                    print(m1[j][i],end='\t')
                print()
            print()
            
        while power<p:
            res = np.dot(res,m1)
            power+=1
        return res'''
    
#print(Power(m1,5))
#Problem5
def Transpose(m1):
    return np.transpose(m1)
#Problem11
def Trace(m1):
    if m1.shape[0]!=m1.shape[1]:
        raise ValueError("Error: Dimension mismatched")
    else:
        return np.trace(m1)
        '''
        res = 0
        print('Trace =',end="")
        for i in range(m1.shape[0]-1):
            print(m1[i][i],end='+')
            res+=m1[i][i]
        i+=1
        print(m1[i][i])
        return res+m1[i][i]  '''
        
#print(Trace(m1))

#Problem12
def CharPoly(m1):
    if m1.shape[0]!=m1.shape[1]:
        raise ValueError("Error: Dimension mismatched")
    else:
        ev= np.linalg.eigvals(m1)
        eva=[]
        for i in ev:
            eva.append(round(i,5))
            #print(eva[i])
        pol=np.polynomial.polynomial.polyfromroots(eva)
        ans=""
        for i in range(len(pol)-1,-1,-1):
            if pol[i]!=0:
                ans = ans + '  ' + str(pol[i])+'x**'+str(i)
        if ans=="":
            return 0
        return ans



#Problem13
def Eigenval(m1):
    if m1.shape[0]!=m1.shape[1]:
        raise ValueError("Error: Dimension mismatched")
    else:
        ev= np.linalg.eigvals(m1)
        eva=[]
        for i in ev:
            eva.append(round(i,5))
        return eva

#Problem14
def Eigenvector(m1):
    if m1.shape[0]!=m1.shape[1]:
        raise ValueError("Error: Dimension mismatched")
    else:
        e,ev= np.linalg.eig(m1)
        '''
        a=[]
        for j in range(len(ev[0])):
                a.append(0)
        vectors=[]
        for i in range(len(ev)):
            vectors.append(a)
        for i in range(len(ev)):
            for j in range(len(ev)):
                vectors[i][j]=round(ev[i][j],4)'''
        return ev
    
print(Eigenvector(m1))  

