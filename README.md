# NewYearsSlideshow

A simple python flask application for rsvp'ing to my family's annual new year's eve party. Also has a slide show for the party.

# How it works:
I had the guests at the party either post pictures to their instagram accounts, or install the "DO camera" app. I had IFTTT
set up to grab their images and send them to a folder in my dropbox. Then, on my server computer I had a cron job using the
dropbox-uploader grabbing the images from dropbox and moving them to a publicly available folder for the website. The website
would make requests to the server for the list of images, and would choose an images at random and animate it in for the next
image to be displayed.

Another little feature I added was a timer that checks the time from my server, and if it's the first day of the year, it will
display a new year's message, and begin animating some fireworks, complete with sounds. (Grabbed from Minecraft, hope that's ok)
