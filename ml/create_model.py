<<<<<<< HEAD
# import pandas as pd
# import numpy as np
=======
import pandas as pd
import numpy as np
>>>>>>> 5f7cb86950f7124b76b6a65efba3ec456e81c303
# filename = "./ml/zenton_ethan.csv"

# data=pd.read_csv(filename, sep = ",", names=["torso_angle", "knee_angle"])
# # print(data)

# params = {}
# datapoints = [15,20,25,30,35,40] # torso angle
# c = 0

# # decide paremeters based on data
# params = {}
# for i in datapoints:
#     knee = (data[(data['torso_angle'] > i-1) & (data['torso_angle'] < i+1)]).loc[:, ('knee_angle')]
#     if len(knee) > 5:
#         mean = np.mean(knee)
#         std = np.std(knee)
#         lower_bound = mean-std
#         upper_bound = mean+std
#         # print(f"{datapoints[c]}: {lower_bound} , {mean}, {upper_bound}")
#         params[i] = (lower_bound, upper_bound)
#     c+=1
# print(filename, params)

# zenton_ethan 
params = {15: (115.69995802367308, 176.92575293383678), 20: (125.84640210966039, 172.21735754226745), 25: (88.89068727354515, 175.1280447087127), 30: (90.94999087111344, 166.2771561069063), 35: (104.26478783029441, 166.04326235420538), 40: (66.75491286859872, 135.60064258541212)}

# ethan params =  {15: (146.5156719515917, 169.54673505087337), 20: (148.21717024452997, 167.0623753848005), 25: (146.82446653550375, 170.8480697894791), 30: (141.6147690310807, 167.705771503275), 35: (136.86128916790562, 166.02938184226377), 40: (95.6317967391815, 134.1250322506662)}
# zenton 
# params = {15: (104.42126155996544, 175.420797009387), 20: (114.17928959112831, 170.2930600786398), 25: (64.97608092028057, 158.8022978049335), 30: (78.61555263245933, 157.0557073567318), 35: (93.45520061778763, 160.5615391538774), 40: (54.62811110078752, 131.74336812398525)}  
# seetoh params = {15: (155.20629150332175, 173.4336280483478), 20: (142.22333275193554, 164.37811710669254), 25: (122.09263121988019, 158.23478020870758), 30: (107.34771709766484, 124.14340580251492), 35: (66.12014870264625, 102.07363595217234), 40: (94.23036469212472, 135.11031077465395)}

# def determine_posture(knee_angle, torso_angle, params):
#     datapoints = [15,20,25,30,35,40]
#     i = params[datapoints[round(torso_angle/5)-3]]
#     print(i[0])
#     if knee_angle > i[0]:
#         if knee_angle < i[1]:
#             message = 'good posture'
#             print(message)
#             return (0, message)
#         else:
#             message = 'your back is too high'
#             print(message)
#             return (1, message)
#     else:
#         message = 'your back is too low'
#         print(message)
#         return -1, message

# determine_posture(80, 34, params)