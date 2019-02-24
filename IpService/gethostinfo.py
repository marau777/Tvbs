#!/usr/bin/env python
from SunFounder_PiPlus import *
import commands

def setup():
	global LCD
	'''
	Initialize the LCD1602 module with SunFounder_PiPlus.LCD1602(BACKGROUND_LIGHT=1, ADDRESS=0x27)
	Set ADDRESS to 0x20~0x27, depending on the address you set on the module (see more at www.sunfounder.com).
	Set BACKGROUND_LIGHT to 0 or 1 to turn off or turn on the backlight. 
	By default, BACKGROUND_LIGHT=1/ADDRESS=0x27
	'''
	LCD = LCD1602(BACKGROUND_LIGHT=1)

def main():
	'''
	Use write(position, row, string) to write and display characters at a specific location
	position in the function is for the position characters starts to appear in a row;
	row ranges from 0 to 1
	'''
	LCD.clear()
	LCD.write(0, 0, commands.getoutput('hostname'))
	LCD.write(1, 1, commands.getoutput('hostname -I') )

def destroy():
	LCD.destroy()
	GPIO.cleanup()
	
if __name__ == "__main__":
	try:
		setup()
		main()
	except KeyboardInterrupt:
		destroy()
