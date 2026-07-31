---
title: "偏相关系数"
date: 2021-12-20
permalink: /2021/12/20/偏相关系数/
excerpt: "偏相关系数的定义、矩阵计算公式与 Python 实现。"
tags:
  - Python
  - 统计分析
  - 偏相关
---

------------------------------------------------------------------------

# 偏相关系数计算

参考  
*<a href="https://book.douban.com/subject/5418944/" target="_blank" rel="noopener">陈彦光编著. 地理数学方法及其应用. 2008, 北京大学城市与环境学院.</a>*  
*<a href="https://en.wikipedia.org/wiki/Partial_correlation" target="_blank" rel="noopener">维基百科</a>*

简单相关系数旨在反映变量之间两两线性关系，但实际上，每一个简单相关系数不可能绝对不包括其他因素的相关成分。为了克服简单相关系数的间接相关信息，有人设计了另一种检验指标，称为偏相关系数（ partial correlation coefficient）。偏相关系数旨在排除其它因素的影响，单纯反映某个自变量与因变量之间的密切程度。

当自变量较多时，利用公式计算偏相关系数相当麻烦，比较便捷的方式是借助简单相关系数构成的相关矩阵进行运算，计算公式如下：

$R_{x_{j} y}=\frac{-c_{j y}}{\sqrt{c_{j j} c_{y y}}}$

这里 $R_{x_{j} y}$ 为第 *j* 个自变量与因变量 *y* 的偏相关系数， *c* 为相关系数矩阵的逆矩阵中对应的元素。

下面是python实现

``` python
# -*- coding: utf-8 -*-
"""
Created on Mon Dec 20 16:53:39 2021
modified: https://gist.github.com/fabianp/9396204419c7b638d38f
@author: pan
"""

import numpy as np
from numpy.linalg import inv
from osgeo import gdal, gdal_array
import os, time,glob
from sklearn import linear_model
from sklearn import preprocessing
from matplotlib import pyplot as plt

def partial_corr(C):
    """
    Returns the sample linear partial correlation coefficients between pairs of variables in C, controlling 
    for the remaining variables in C.
    Parameters
    ----------
    C : array-like, shape (n, p)
        Array with the different variables. Each column of C is taken as a variable
    Returns
    -------
    P_corr : array-like, shape (p, p)
        P_corr[i, j] contains the partial correlation of C[:, i] and C[:, j] controlling
        for the remaining variables in C.
    """
    
    C = np.asarray(C)
    p = C.shape[1]
    P_corr = np.zeros((p, p)) # sample linear partial correlation coefficients
    
    corr = np.corrcoef(C,rowvar=False) # Pearson product-moment correlation coefficients.
    corr_inv = inv(corr) # the (multiplicative) inverse of a matrix.
    
    for i in range(p):
        P_corr[i, i] = 1
        for j in range(i+1, p):
            pcorr_ij = -corr_inv[i,j]/(np.sqrt(corr_inv[i,i]*corr_inv[j,j]))
            P_corr[i,j]=pcorr_ij
            P_corr[j,i]=pcorr_ij
        
    return P_corr
```
