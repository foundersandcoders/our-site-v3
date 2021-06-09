---
title: Expression of Interest
base: app1y0DIoLKyboTUs
table: EOI
fields:
  - label: Your full name
    id: name
  - id: email
    label: Your email address
    type: email
  - id: confirm-email
    label: Please confirm your email address
    type: email
    matchId: email
  - label: Winter 2021 cohort
    id: cohort-confirm
    info: Our applications work in cycles. By completing this form you are expressing interest in our upcoming cohort in Winter 2021.
    type: confirm
    confirmLabel: I understand that I will only be able to apply for the Winter 2021 cohort
  - label: Do you have the right to apply for an apprenticeship in the UK?
    id: eligible-apprenticeship
    info: |
      It is your responsibility to read through this document and assess whether or not you're eligible for our programme:

      https://www.gov.uk/guidance/apprenticeship-funding-rules-for-employers/annex-a-eligibility-criteria-who-we-fund
    type: select
    options:
      - Yes, I am eligible for an apprenticeship in the UK
      - No, I am not eligible for an apprenticeship in the UK
  - label: Are you over 18 years old?
    id: eligible-age
    info: Unfortunately for insurance reasons we cannot accept anyone younger than 18 on our programmes.
    type: select
    options:
      - Yes, I am over 18 years old
      - No, I am not over 18 years old
  - label: Where are you normally resident?
    id: residence
    type: select
    options:
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
      - Elsewhere in London
      - Elsewhere in the UK
      - Outside the UK
  - label: Where did you go to school?
    id: school-location
    type: select
    options:
      - A state school in Islington
      - A state school elsewhere in London
      - A state school elsewhere in the UK
      - An independent school in the UK
      - Elsewhere
  - label: Do you have a degree?
    id: degree
    type: select
    options:
      - Yes I have a degree
      - No I do not have a degree
  - label: What is your current work status?
    id: work-status
    type: select
    options:
      - Unemployed
      - In employment
      - Studying
  - label: What is your most recent job title?
    id: job-title
  - label: Were you referred to us by...?
    id: referrer
    type: select
    options:
      - Islington Council
      - Finsbury Park job centre
      - City & Islington College
      - Platform
      - Minority Matters
      - Jubba Youth
      - Other Islington-based organisation
      - None of the above
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
  - label: Age group
    id: age-group
    type: select
    options:
      - 18-24
      - 25-34
      - 35-44
      - 45-54
      - 55 and above
      - Prefer not to say
---

Complete this form if you're interested in the Winter 2021 cohort of Founders and Coders. We'll check your eligibility and get back to you with details on how to start your coding journey.
