---
permalink: false
title: Spring 2021 course application
base: app59gkHsHkJbipcC
table: Spring 2021
fields:
  - id: email
    label: Your email address
    type: email
  - id: confirm-email
    label: Please confirm your email address
    type: email
    matchId: email
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
    type: textdate
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
    label: If you belong to an ethnic group not listed above please enter it here
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
    required: false
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
  - id: school-type
    label: My secondary school was
    type: select
    options:
      - A state school in Islington
      - A state school elsewhere in London
      - A state school elsewhere in the UK
      - An independent school in the UK
      - Elsewhere
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
    required: false
  - id: post-course
    label: Do you plan to seek employment through Founders and Coders during or after the course?
    type: select
    options:
      - Yes
      - No
  - id: community
    label: Have you been involved in our community?
    type: multiple
    required: false
    options:
      - I have previously applied to Founders and Coders
      - I have attended Founders and Coders meetups at Space4
      - I have attended Founders and Coders remote meetups on Zoom
  - id: apprenticeships
    label: Are you interested in apprenticeships?
    info: |
      Founders and Coders is now a registered Apprenticeship Training Provider. What this means is that programme participants will have the option to apply for paid apprentice roles with our employer partners either before or during the programme.
    type: select
    options:
      - Yes, I am interested in applying for an apprenticeship
      - No, I am not interested in applying for an apprenticeship
  - type: heading
    label: Course requirements
  - id: github
    label: What is your GitHub username?
  - id: website
    type: url
    validationMessages:
      type-mismatch: Please enter a valid URL (starting with "https://")
    label: What is the URL of your application website?
    info: Please make sure you're submitting the hosted, live link of your website, and not a link to your GitHub repository.
    example: "E.g. https://my-name.github.io/my-site"
  - id: checklist
    label: Application checklist
    info: |
      You have until 23:59 GMT on January 10 to submit this application as well as finish all of your [application requirements](https://www.foundersandcoders.com/apply#application-requirements). Before that date, please make sure you double check your application. We've made this checklist to help make it easier:
    type: multiple
    options:
      - I understand that I can keep working on the requirements until 23:59 GMT on January 10
      - I have (will have) completed all the required freeCodeCamp sections
      - I have (will have) completed all 20 required Codewars kata
      - I have (will have) fulfilled all of the application website criteria
  - id: feedback
    label: Application feedback
    type: confirm
    confirmLabel: I understand I will not receive feedback on my application
    info: |
      According to our About page, [we don't provide individualised feedback](https://www.foundersandcoders.com/about/#can-you-tell-me-why-i-wasn-t-admitted-or-give-me-feedback-on-my-application). We have however broken that rule several times in the past, and with hindsight this was a mistake. Moving forward, we're reenforcing the no individualised feedback rule.

      Beyond this though, we do always try to make the selection process transparent. We will communicate to all applicants on Slack: how many applications we've received, how many applicants we are planning on interviewing, and how the interview will be structured. However, like any admissions process, ours is far from perfect and we know we can make mistakes along the way.

      Our selection process is not based on selecting individuals, but rather a group of 16 people who we think will work well together and prioritise cooperative learning. If you'd like to learn a little about the kinds of people we're looking for, [you can read more here](https://www.foundersandcoders.com/apply/#what-kind-of-people-are-we-looking-for).

      Our decisions on who is invited to interview are based on a number of factors. These include: your eligibility for our course; engagement with our Slack community; attendance at our meet-ups and workshops; representation of the change we'd like to see in the tech industry. Your application website is an opportunity to show us who you are and why you're interested in our course — make the most of this opportunity to help us get to know you. However, if you haven’t finished the course requirements by the application deadline, we are unlikely to invite you for an interview.

      Our programme is, to this date, still very oversubscribed. We understand that people will be justifiably disappointed when they're not selected for an interview given the time and effort you all will have put into the application process. However, please know that if your end goal is to become a software developer, then you have not wasted your time and effort in completing our requirements—joining Founders and Coders is just one of many pathways to becoming a developer.
---

This application is for the London programme starting on March 8.

Applications will close at 23:59 GMT on January 10, 2021.

COVID-19 is having a significant impact on Founders and Coders, as it is on everybody. Although we are hopeful that we will be able to return to our Finsbury Park campus very soon, it is likely that our spring 2021 cohort will start as a remote programme.

It’s worth noting we've now run two cohorts fully remote and we’re having lots of fun with remote-learning. In the event that spring 2021 cohort is remote-first, the requirement for our London programme remains the same – we accept people who have the right to work in the UK and who intend to seek employment with our partners after the end of the programme.