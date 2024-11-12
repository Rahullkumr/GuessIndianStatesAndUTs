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
message = "" 

def show_congrats():
    screen.tracer(0)
    overlay = turtle.Turtle()
    overlay.hideturtle()
    overlay.penup()
    overlay.color("black")
    overlay.fillcolor("white")
    overlay.begin_fill()
    
    overlay.goto(-200, 200)
    overlay.pendown()
    for _ in range(2):
        overlay.forward(400)
        overlay.right(90)
        overlay.forward(200)
        overlay.right(90)
    overlay.end_fill()
    
    congrats = turtle.Turtle()
    congrats.hideturtle()
    congrats.penup()
    congrats.color("green")
    congrats.goto(0, 150)
    congrats.write("Congratulations!", 
                   align="center", font=("Arial", 24, "bold"))
    
    congrats.goto(0, 100)
    congrats.write("You've guessed all states!", 
                   align="center", font=("Arial", 16, "normal"))
    
    close_button = turtle.Turtle()
    close_button.hideturtle()
    close_button.penup()
    close_button.color("black")
    close_button.goto(0, 50)
    close_button.write("Click anywhere to close", 
                      align="center", font=("Arial", 12, "normal"))
    screen.update()
    screen.exitonclick()

while len(guessed_states) <= 36:
    if len(guessed_states) == 36:
        turtle.textinput(title="Game Complete!", 
                        prompt="Congratulations! You've guessed all states!")
        break
    prompt_text = f"What's another name?\n{message}" if message else "What's another name?"
    ans_state = (turtle.textinput(title=f'{len(guessed_states)}/36 States Correct',
                                 prompt=prompt_text)).title()
    
    message = ""

    if ans_state == 'Exit':
        # names_you_missed.csv
        missed_states_dict = {
            "Missed States": [state for state in all_states if state not in guessed_states]
        }
        df = pd.DataFrame(missed_states_dict)
        df.to_csv('./names_you_missed.csv', mode='w')
        break

    if ans_state in all_states:
        if ans_state in guessed_states:
            message = f"{ans_state} is already guessed!"
            continue
        guessed_states.append(ans_state)
        t = turtle.Turtle()
        t.hideturtle()
        t.penup()
        state_data = data[data['state'] == ans_state]
        t.goto(state_data.x.item(), state_data.y.item())
        
        if ans_state == 'Dadra And Nagar Haveli And Daman And Diu':
            t.write(f'Dadra And Nagar Haveli\nAnd Daman And Diu', font=("", 10, ''))
        elif ans_state == 'Andaman And Nicobar Islands':
            t.write(f'Andaman And\nNicobar Islands', font=("", 10, ''))
        else:
            t.write(f'▼{ans_state}', font=("", 10, ''))

        if len(guessed_states) == 36:
            show_congrats()

screen.mainloop()
