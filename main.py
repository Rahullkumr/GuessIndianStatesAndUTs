import turtle
import pandas as pd

screen = turtle.Screen()
screen.setup(width=775, height=900)
screen.title('Indian states and UTs game')
image = 'map_of_India.gif'
screen.addshape(image)
turtle.shape(image)

data = pd.read_csv('./states_and_uts.csv')
all_states = data.state.to_list()
guessed_states = []

while len(guessed_states) <= 36:
    ans_state = (turtle.textinput(title=f'{len(guessed_states)}/36 States Correct',
                                  prompt="What's another name? ")).title()

    if ans_state == 'Exit':
        # names_you_missed.csv
        missed_states_dict = {
            "Missed States": [state for state in all_states if state not in guessed_states]
        }
        df = pd.DataFrame(missed_states_dict)
        df.to_csv('./names_you_missed.csv', mode='w')
        break

    if ans_state in all_states:
        guessed_states.append(ans_state)
        t = turtle.Turtle()
        t.hideturtle()
        t.penup()
        state_data = data[data['state'] == ans_state]
        t.goto(state_data.x.item(), state_data.y.item())
        # t.write(f'▼{ans_state}', font=("", 10, ''))
        if ans_state == 'Dadra And Nagar Haveli And Daman And Diu':
            t.write(f'Dadra And Nagar Haveli\nAnd Daman And Diu', font=("", 10, ''))
        elif ans_state == 'Andaman And Nicobar Islands':
            t.write(f'Andaman And\nNicobar Islands', font=("", 10, ''))
        else:
            t.write(f'▼{ans_state}', font=("", 10, ''))

