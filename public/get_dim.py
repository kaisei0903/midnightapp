import struct
import imghdr

def get_image_size(fname):
    with open(fname, 'rb') as fhandler:
        head = fhandler.read(24)
        if len(head) != 24:
            return
        if imghdr.what(fname) == 'png':
            check = struct.unpack('>i', head[4:8])[0]
            if check != 0x0d0a1a0a:
                return
            width, height = struct.unpack('>ii', head[16:24])
        elif imghdr.what(fname) == 'gif':
            width, height = struct.unpack('<HH', head[6:10])
        elif imghdr.what(fname) == 'jpeg':
            try:
                fhandler.seek(0) # Read 0xff next
                size = 2
                ftype = 0
                while not 0xc0 <= ftype <= 0xcf:
                    fhandler.seek(size, 1)
                    byte = fhandler.read(1)
                    while ord(byte) == 0xff:
                        byte = fhandler.read(1)
                    ftype = ord(byte)
                    size = struct.unpack('>H', fhandler.read(2))[0] - 2
                # We are at a SOFn block
                fhandler.seek(1, 1)  # Skip `precision' byte.
                height, width = struct.unpack('>HH', fhandler.read(4))
            except Exception: #IGNORE:WE002
                return
        else:
            return
        return width, height

print(get_image_size('bg-portrait.jpg'))
