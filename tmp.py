in_file = open("tmp.txt", "r")
lis = in_file.readlines()

out_file = open("out.txt", "w")

for s in lis:
    out_file.write(s.replace("123", "456"))
