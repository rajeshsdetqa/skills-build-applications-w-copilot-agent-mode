from djongo import models

class Team(models.Model):
	name = models.CharField(max_length=100, unique=True)
	description = models.TextField(blank=True)
	class Meta:
		db_table = 'teams'
	def __str__(self):
		return self.name

class User(models.Model):
	name = models.CharField(max_length=100)
	email = models.EmailField(unique=True)
	team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, related_name='members')
	is_superhero = models.BooleanField(default=False)
	class Meta:
		db_table = 'users'
	def __str__(self):
		return self.name

class Activity(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
	activity_type = models.CharField(max_length=100)
	duration = models.PositiveIntegerField(help_text='Duration in minutes')
	date = models.DateField()
	class Meta:
		db_table = 'activities'
	def __str__(self):
		return f"{self.user.name} - {self.activity_type}"

class Workout(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField(blank=True)
	suggested_for = models.ManyToManyField(Team, related_name='workouts', blank=True)
	class Meta:
		db_table = 'workouts'
	def __str__(self):
		return self.name

class Leaderboard(models.Model):
	team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='leaderboard_entries')
	points = models.PositiveIntegerField(default=0)
	class Meta:
		db_table = 'leaderboard'
	def __str__(self):
		return f"{self.team.name} - {self.points} pts"
