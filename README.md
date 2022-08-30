# jobTracker
Project Choice (Tell us which project you're doing!)
A name for your Project
Job Tracker

Project Description
General App Idea/Purpose

I'm creating an app that allows users to track jobs applied and update if an interview was granted. I am creating this app because I will be applying to a lot of jobs soon and would like a way to track it.

Models including field names and their datatypes

I'll be creating a jobs model which tracks the job title, location, date applied, and if granted an interview. Job title, location, and date will be a string. Getting an interview will be boolean. I will also use a user model that accepts email and password.

A list of routes (e.g. POST /pins/ allows users to post a picture of a pin)

Index/GET- /myjobs - Show all the jobs users applied to
New/GET - /myjobs/new - Display form to add a job to the user's list
Create/POST - /myjobs - Create new entry and redirects to index
Show/GET - /myjobs/:id - Show info about job
Edit/GET - /myjobs/:id/edit - Show edit form to adjust job listing
Update/POST - /myjobs/:id - Update job listing info and redirect back to show page
Destroy/DELETE - /myjobs/:id - Delete a specific job listing and redirect to the index page

Wireframes
Wireframes with basic page layouts

Copy and paste or drag and drop your images here.
Screen Shot 2022-08-20 at 10 59 28 AM
Screen Shot 2022-08-20 at 10 59 48 AM
Screen Shot 2022-08-20 at 11 00 45 AM
Screen Shot 2022-08-20 at 11 01 03 AM
Screen Shot 2022-08-20 at 11 01 27 AM
Screen Shot 2022-08-20 at 11 01 50 AM

User Stories
User stories detailing app functionality

Add user stories following the As a [type of user], I want [what the user wants], so that [what it helps accomplish] format.
-Users should be able to access all of their jobs once they log in
-They should be able to click on a job to pull up their show page
-On the show page they should be able to edit the information on the page
-Users should be able to add a new and delete job to their collection from the index page
-Users should be able to navigate back to the index page from any page

MVP Goals
-User should be able to sign in and see the list of jobs applied for
-User should be able to add a job to the list
-User should be able to update a job on the list
-User should be able to delete a job on the list

Stretch Goals
-add user auth
