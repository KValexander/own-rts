# Connect files
from configs import *

# Handling mouse collision
def mouseCollision(item, mousePos):
	x, y = mousePos
	if( item.x < x and (item.x + item.width) > x
		or item.x < y and (item.y + item.height ) > y):
		return true
	else: return false

# Handling select collision
def selectCollision(selRect, item):
	# The wonders of mathematics
	if( #TopLeft
		selRect.x < item.rect.x and (selRect.x + selRect.width) > (item.rect.x + item.rect.width)
		and selRect.y < item.rect.y and (selRect.y + selRect.height) > (item.rect.y + item.rect.height) or
		# BottomLeft
		selRect.x < item.rect.x and (selRect.x + selRect.width) > (item.rect.x + item.rect.width)
		and selRect.y > item.rect.y and (selRect.y + selRect.height) < (item.rect.y + item.rect.height) or
		# TopRight
		selRect.x > item.rect.x and (selRect.x + selRect.width) < (item.rect.x + item.rect.width)
		and selRect.y < item.rect.y and (selRect.y + selRect.height) > (item.rect.y + item.rect.height) or
		# BottomRight
		selRect.x > item.rect.x and (selRect.x + selRect.width) < (item.rect.x + item.rect.width)
		and selRect.y > item.rect.y and (selRect.y + selRect.height) < (item.rect.y + item.rect.height)
	):
		return True
	else: return False

# Handling item collision
def itemCollision(item, it):
	if(		item.rect.x <= (it.rect.x + it.rect.width)
		and it.rect.x 	<= (item.rect.x + item.rect.width)
		and item.rect.y <= (it.rect.y + it.rect.height)
		and it.rect.y 	<= (item.rect.y + item.rect.height)):
		return True
	else: return False
