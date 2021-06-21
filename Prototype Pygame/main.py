# Including pygame library
import pygame

# Connect files
from configs import *

# Connect classes
from methods import Collision
from methods import Mouse
from methods import Key
from methods import Cash
from methods import Grid

# Main class
class Main:
	# Init class
	def __init__(self):
		pygame.init();

		# Screen
		self.screen = pygame.display.set_mode(SIZE)
		pygame.display.set_caption("Storm of Wars")

		# Groups
		self.items = pygame.sprite.Group()
		self.selectedItem = pygame.sprite.Group()

		# Gameloop speed
		self.clock = pygame.time.Clock()
		# State gameloop
		self.running = True

		# Loading elements
		self.loading()

	# Creating elements before start
	def loading(self):
		self.collision = Collision() # Collision
		self.mouse 	   = Mouse() 	 # Mouse
		self.key 	   = Key() 	  	 # Keys
		self.cash 	   = Cash() 	 # Cash
		self.grid 	   = Grid() 	 # Grid

		# Load background image
		# self.bg = pygame.image.load("images/map.jpg")
		# self.bg = pygame.transform.scale(self.bg, SIZE)

		self.start()

	# Start playing
	def start(self):
		self.running = True
		self.loop()

	# Handling events
	def events(self):
		# Event handling
		for event in pygame.event.get():
			# Quitting the game
			if event.type == pygame.QUIT: self.running = False

			# Key down
			if event.type == pygame.KEYDOWN:
				self.key.keyDown(event)

			# Mouse down
			if event.type == pygame.MOUSEBUTTONDOWN:
				self.mouse.mouseClick(event)

			# Mouse move
			if event.type == pygame.MOUSEMOTION:
				self.mouse.mouseMove(event)

	# Intermediant calculation
	def update(self):
		# Gameloop speed
		self.clock.tick(FPS)

		# Handling events
		self.events()

	# Rendering
	def render(self):
		# Background color
		self.screen.fill(WHITE)

		# Rendering grid
		self.grid.drawGrid(self.screen)

		pygame.draw.rect(self.screen, GREEN, [self.grid.gridSize(self.mouse.moveX, "x"), self.grid.gridSize(self.mouse.moveY, "y"), 16, 16])

		# Clear past render
		pygame.display.flip()

	# Gameloop
	def loop(self):
		# Gameloop
		while self.running:
			# Intermediant calculation
			self.update()

			# Rendering
			self.render()

Main()
pygame.quit()