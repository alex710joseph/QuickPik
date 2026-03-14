[ProjectProposal] @John Alexis Guerra Gomez (Teacher)

Project Name: QuickPik

Members:

* @Alex Joseph (Matrix Creation & Management)
* @Rajiv Philip (Participant Input & Results Visualization)

Description:
QuickPik is a lightweight matrix-based decision platform designed to help groups quickly reach consensus when multiple options and preferences need to be evaluated together. In many real-world situations like choosing a restaurant, prioritizing project tasks, deciding travel plans or selecting a meeting time, group discussions stall because everyone has slightly different preferences and there is no clear way to visualize collective agreement.

QuickPik solves this by allowing a user to create a decision matrix poll where multiple options are organized in a grid. The creator then shares the link to the decision matrix poll to the participants. Participants submit their preferences across the matrix, and the system aggregates responses into a visual heatmap. The heatmap highlights areas where the group’s preferences align the most, allowing the poll creator to immediately identify the strongest consensus instead of manually comparing responses from group chats, spreadsheets or simple linear polls.

User Personas:

1. The Indecisive Friend Group ("Emma"):
   Emma and her friends are trying to decide where to eat dinner and when to go. Instead of debating endlessly in a group chat, Emma creates a QuickPik matrix poll with five restaurant cuisines (Thai, Italian, Vietnamese, Mexican, Japanese) as rows and possible reservation times (6 PM, 7 PM, 8 PM) as columns. Each friend marks the combinations they are comfortable with. The resulting heatmap visualization highlights the time and cuisine combination with the strongest group preference, helping Emma quickly finalize the reservation.

2. The Project Team Lead ("Daniel"):
   Daniel is leading a student project and the team needs to decide which tasks should be prioritized for the next sprint. He creates a QuickPik matrix poll listing project tasks as rows (UI Design, Database Setup, Authentication System, API Integration) and priority levels as columns (Low, Medium, High). Each team member marks how important they believe each task is. The aggregated results produce a *priority heatmap*, making it immediately clear which tasks the majority of the team believes should be tackled first.

3. The Event Organizer ("Sofia"):
   Sofia is planning a weekend outing for her friends and needs to determine the best activity and day. She creates a QuickPik matrix poll with activity options (Hiking, Movie Night, Bowling, Dinner) and available days (Friday, Saturday, Sunday). As friends submit their availability and preferences, the heatmap clearly reveals the activity-day combination that works best for most participants.

User Stories

1. Matrix Creation and Management (Alex Joseph)

1.1. Create Matrix Poll:
As a user, I want to create a new QuickPik matrix poll with a title, row options, and column options, so I can structure a group decision problem in a grid format.

1.2. Edit Matrix Poll:
As a poll creator, I want to edit the matrix title, row options, or column options, so I can update the decision structure if plans change.

1.3. Delete Matrix Poll:
As a poll creator, I want to delete a matrix poll that is no longer needed, so outdated decisions do not remain in the system.

1.4. Close Poll:
As a poll creator, I want to close the poll once enough responses have been collected and visualize the final result as a heatmap.

2. Participant Input (Rajiv Philip)

2.1. Access Matrix Poll:
As a participant, I want to open a matrix poll using a shared link or poll ID, so I can view the decision grid and available options.

2.2. Submit Preferences:
As a participant, I want to select cells within the matrix that represent acceptable or preferred combinations, so my preferences are recorded accurately.

2.3. Update Preferences:
As a participant, I want to edit my selections before the poll closes, so I can adjust my preferences if plans change.

2.4. Remove Participation:
As a participant, I want to delete my submission if I decide not to participate anymore, keeping the dataset accurate.

Tech Stack:

* Backend: Node.js + Express
* Database: MongoDB (Native NodeJS Driver)
* Frontend: React with Hooks
* Styling: CSS / Bootstrap

Thus, QuickPik provides a simple but powerful way for groups to visualize collective preferences and move from indecision to clear consensus using an intuitive matrix heatmap.