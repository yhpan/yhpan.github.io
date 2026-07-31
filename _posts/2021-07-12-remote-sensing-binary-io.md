---
title: "python遥感数据写为二进制文件并读取"
date: 2021-07-12
permalink: /2021/07/12/python遥感数据写为二进制文件并读取/
excerpt: "使用 Python 在数组与遥感模型常用的二进制数据格式之间进行转换。"
tags:
  - Python
  - 遥感
  - 数据处理
  - 二进制
---

由于历史原因，我们研究使用的很多大型模型，输入的数据格式都要求为二进制数据格式。因此，读取遥感数据为数组，将其保存为二进制格式文件，从二进制格式文件读取数据为数组就是一种常见的操作了。下面我将介绍如何利用python语言实现上述操作。

## 将数组保存为二进制文件

``` python
import numpy as np
import struct

# 生成一个数组
# 注意这里根据要求设置数据类型.astype(np.uint16)
# 不同的数据类型占用的字节数以及存储的数值范围不同，比如float32需要4字节存储
# 这一步数据类型的正确设置，与下一步从中正确读取数组密切相关
data = np.arange(10000).reshape(100,100).astype(np.uint16)
# 以二进制写模式打开一个新文件
# 关于python文件操作，可以参考：
#    https://www.runoob.com/python/file-methods.html
f = open('data/2001.raw','wb')
# 将数组写入文件
f.write(data)
# 关闭文件
f.close()
```

## 从二进制文件读取数据为数组

``` python
import numpy as np
import struct
# 以二进制读模式打开数据文件
f = open('data/2001.raw','rb')
# 读取数据为字符串
data = f.read()
# 关闭文件
f.close()
# 获取字符串长度
d_len = len(data)
# 根据数据头文件，设置行、列（、波段数）
row = 2090
col = 4950
band = 12
# 使用struct将data转换为uint16 tuple数组
# 对于uint16(unsigned short)类型，一般占用2字节，因此数组长度应为d_len/2, 标识为H
# 滚与其他格式，请参考：
#    https://www.cnblogs.com/gala/archive/2011/09/22/2184801.html
#    https://blog.csdn.net/weixin_41912543/article/details/108072869
data1 = struct.unpack('{}H'.format(int(d_len/4)),data)
data1 = np.array(list(data1)).reshape(band,row,col).astype(np.float32)
```
