# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


users = User.create([
  { fullname: 'Darth Vader', email: 'lordvader@galacticmail.com', password: 'deathstar101', password_confirmation: 'deathstar101' },
  { fullname: 'Cosmo Palpatine', email: 'emperorpalpatine@galacticmail.com', password: 's1thLord', password_confirmation: 's1thLord' }
])

vaders_lists = List.create([
  { user: User.first, title: 'Executions' },
  { user: User.first, title: 'Death Star' },
  { user: User.first, title: 'Hobbies' }
])

vaders_executions_tasks = Task.create([
  { list: List.find(1), title: 'Luke Skywalker', description: 'May require lightsaber combat.', due: '2014/1/1', list_position: 1 },
  { list: List.find(1), title: 'Petty Officer Crum', description: 'Has become an irritation.', due: '2013/10/10', list_position: 2},
  { list: List.find(1), title: 'Emperor Palpatine', description: 'Every Sith must slay his master.', due: '2013/10/11', list_position: 3 }
])

vaders_death_star_tasks = Task.create([
  { list: List.find(2), title: 'Address major core structural vulnerability', description: 'Could be exploited by rebels.', due: '2013/10/16', list_position: 1 },
  { list: List.find(2), title: 'Purchase additional construction droids.', due: '2013/10/15', list_position: 2}
])

palpatines_lists = List.create([
  { user: User.last, title: 'Dark Path' }
])

palpatines_dark_path_tasks = Task.create([
  { list: List.find(4), title: 'Learn to double lightning bolts', description: 'Useful should vader get ideas.', list_position: 1 },
  { list: List.find(4), title: 'Double strangulation distance', list_position: 2 }
])

vaders_tags = Tag.create([
  { user: User.first, name: 'family' },
  { user: User.first, name: 'empire' },
  { user: User.first, name: 'rebels' },
  { user: User.first, name: 'droids' }
])

vaders_taggings = Tagging.create([
  { tag: Tag.first, task: Task.first },
  { tag: Tag.find(2), task: Task.find(3) },
  { tag: Tag.find(2), task: Task.find(4) },
  { tag: Tag.find(3), task: Task.find(4) },
  { tag: Tag.find(4), task: Task.find(5) },
])

vaders_notes = Note.create([
  { task: Task.first, body: 'His powers are growing stronger. This is worrying.' },
  { task: Task.first, body: 'Should I really kill my own son? This question has been plagueing me. I fear I must, and it will kill the last residue of humanity within me.' },
  { task: Task.find(2), body: 'Perhaps I should consider replacing all Petty Officers with droids.' },
  { task: Task.find(5), body: 'Sector 9 is in need of translation droids.' }
])


