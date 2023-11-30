import numpy as np
#import sympy as sp

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
    



