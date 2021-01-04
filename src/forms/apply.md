---
title: Founders and Coders application
fields:
  - id: email
    label: Your email address
    type: email
  - id: confirm-email
    label: Please confirm your email address
    type: email
  - id: quiz
    label: Please answer the following problem
    type: longtext
    info: |
      Here is a series of three steps:

      1. X = 30
      1. Y = 50
      1. X = Y

      X and Y are variables—they can stand for any value. 
      The "=" sign stands for assignment. It means "assign the value on the right to the variable on the left".

      After all three steps above have been completed what are the values of X and Y? Please explain your solution as if you're helping someone who is less familiar with programming.
  - type: heading
    label: About you
  - id: name
    label: Your full name
  - id: dob
    label: Date of birth
    info: Don't forget to change the year
    type: date
  - id: pronouns
    label: What are your pronouns?
    type: select
    options:
      - They/them
      - She/her
      - He/him
      - Prefer not to say
      - Custom (enter below)
  - id: custom-pronouns
    label: If you selected "Custom" above please enter your pronouns
    required: false
  - id: ethnicity
    label: What ethnic group do you belong to?
    type: select
    options:
      - "Asian or Asian British: Indian, Pakistani, Bangladeshi, Chinese, or any other Asian background"
      - "Black, African, Caribbean or Black British or any other Black, African or Caribbean background"
      - "White: British, Irish, or any other White background"
      - "Mixed or multiple ethnic groups: White and Caribbean, White and Black African, White and Asian, or any other mixed or multiple ethnic background"
      - Prefer not to say
      - Any other ethnic groups (enter below)
  - id: custom-ethnicity
    label: If you selected "Any other ethnic groups" above please enter your ethnicity
    required: false
  - id: london-borough
    label: Which London borough do you live in (if any)?
    type: select
    options:
      - I don't live in London
      - Barking and Dagenham
      - Barnet
      - Bexley
      - Brent
      - Bromley
      - Camden
      - Croydon
      - Ealing
      - Enfield
      - Greenwich
      - Hackney
      - Hammersmith and Fulham
      - Haringey
      - Harrow
      - Havering
      - Hillingdon
      - Hounslow
      - Islington
      - Kensington and Chelsea
      - Kingston upon Thames
      - Lambeth
      - Lewisham
      - Merton
      - Newham
      - Redbridge
      - Richmond upon Thames
      - Southwark
      - Sutton
      - Tower Hamlets
      - Waltham Forest
      - Wandsworth
      - Westminster
  - id: address
    label: If you don't live in London what city and country do you live in?
    example: "E.g. Paris, France"
  - id: nationality
    label: What is your nationality?
    type: select
    options:
      - British
      - Other
  - id: right-to-work
    label: Do you have the right to work in the UK?
    type: select
    options:
      - Yes, I have the right to work in the UK
      - No, I do not have the right to work in the UK
  - id: education
    label: What is your educational background?
    type: select
    options:
      - I have completed secondary school (high school)
      - I have left higher education without a degree
      - I have completed a bachelor's degree
      - I have completed a master's degree
      - I have completed a PhD
  - id: university
    label: Which university or college did you attend?
  - id: university-subject
    label: What was your subject(s) of study?
  - id: school
    label: Which secondary school did you attend?
  - id: employment
    label: What is your current employment status?
    type: select
    options:
      - Student
      - Unemployed
      - On furlough
      - Self-employed
      - In part-time employment
      - In full-time employment
      - Business owner
  - id: income
    label: What is your annual income?
    type: select
    options:
      - Less than £15,000
      - £15,000-£25,000
      - £25,000-£35,000
      - Above £35,000
      - Prefer not to say
  - id: commitments
    label: Are you free of work and study commitments for the duration of the programme?
    type: select
    options:
      - Yes
      - No
  - id: commitments-description
    label: If you answered "no" to the previous question, please briefly describe your other commitments
  - id: post-course
    label: Do you plan to seek employment through Founders and Coders after the course ends?
    type: select
    options:
      - Yes
      - No
  - type: heading
    label: Course requirements
  - id: github
    label: What is your GitHub username?
  - id: website
    type: url
    label: What is the URL of your application website?
    info: Please make sure you're submitting the hosted, live link of your website, and not a link to your GitHub repository.
    example: "E.g. https://my-name.github.io/my-site"
---

This application is for the London programme starting on March 8 and ending on July 9, 2021.

Applications will close at 23:59 GMT on January 10, 2021.

COVID-19 is having a significant impact on Founders and Coders, as it is on everybody. Although we are hopeful that we will be able to return to our Finsbury Park campus very soon, it is likely that our spring 2021 cohort will start as a remote programme.

It’s worth noting we've now run two cohorts fully remote and we’re having lots of fun with remote-learning. In the event that spring 2021 cohort is remote-first, the requirement for our London programme remains the same – we accept people who have the right to work in the UK and who intend to seek employment with our partners after the end of the programme.
