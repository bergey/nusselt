#!/usr/bin/env python
from parametrics import hourly_data
from os.path import join, basename

def float_to_str(f):
    if f < 1:
        return "{0:.3f}".format(f)
    elif f < 10:
        return "{0:.1f}".format(f)
    else:
        return "{0:d}".format(int(f))

def dir_to_json(path):
        h = hourly_data(path).__dict__
        for key in h.keys():
            if key=='name':
                continue
            handle = open(join(path, "{0}-{1}.json".format(basename(path), key)), "w")
            handle.write("[ ")
            handle.write(", ".join(map(float_to_str, h[key].tolist())))
            handle.write("]\n")
            handle.close()

dir_to_json('/home/out/s1/z5h100s1rh50v1')
