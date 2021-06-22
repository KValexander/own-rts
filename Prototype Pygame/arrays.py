# Connect files
from configs import *

# Import templates
from templates import Worker

# Arrays
items = []
selectedItems = []

# Adding item
def addItem(case, counter, x, y):
	if(case == "worker"):
		item = Worker(counter, x, y)
	if(case == "soldier"):
		item = Soldier(counter, x, y)
	items.append(item)

# Adding items in selection items
def addSelection(item):
	item.selected = True
	selectedItems.append(item)

# Clear selected items
def clearSelection():
	for item in items:
		item.selected = False
	selectedItems.clear()
