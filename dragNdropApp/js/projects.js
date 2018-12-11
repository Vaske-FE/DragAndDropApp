/**
 * Projects jQuery file
 * @author   Vaske
 * @date     30.05.2017.
 * @version  0.0.1
 * @note     
**/

$(function() {
    loadProjects();
});

var projects = null;

function loadProjects() {
    var $projectsList = $('#projects');
    
    $.ajax({
        type:'POST',
        url:'ajax/projects.json',
        dataType:'json',
        cache:false,
        success: function (response) {
            if (response.projects) {
                // save projects
                projects = response.projects;

                // for each Project, add a new LI element...
                $.each(projects, function (i, item) {
                    // create team members element
                    var $teamMembers = $('<ul id="team-members-' + item.id + '"></ul>');
                    $teamMembers.addClass('team-members');

                    // for each team member...
                    $.each(item.team_members, function (m, member) {
                        // create member element with its attributes
                        var $teamMember = $('<li id="team-member-' + member.id + '"></li>');
                        var memberHtml = '';
                        memberHtml += '<img src="images/member.png" alt="" class="photo">';
                        memberHtml += '<p>' + member.name;
                        memberHtml += '<span class="prof">' + member.role + '</span></p>';
                        memberHtml += '<img src="images/menu_24.png" alt="" class="menu1">';
                        $teamMember.html(memberHtml);

                        // add the new member into members
                        $teamMembers.append($teamMember);
                    });

                    // create menuIcon
                    var $menuIcon = $('<a href="#" class="botmenu"><img src="images/menu_16.png" alt=""></a>');

                    // create project item, set attributes and add team members element
                    var $projectItem = $('<li id="project-' + item.id + '"></li>');
                    $projectItem
                        .addClass('project')
                        .html('<h3> Project: <span>' + item.name + '</span></h3>')
                        .append($teamMembers)
                        .append($menuIcon);
                    
                    // add the project item into projects element
                    $projectsList.append($projectItem);
                });
                            
                // set projects attributes
                $projectsList.addClass('projects-list');

                // init sortable plugin
                initSort('projects-list');
                initSort('team-members');
                
            }
        },
        error:function(err){
            alert("Projects are not loaded!");
        }
    });
}

// Init Sortable widget
function initSort(elmName) {
    var elmSel = '.' + elmName;
    var $elm = $(elmSel);
    
    $elm.sortable({
        connectWith: elmSel,
        stop: function (event, ui) {
            var targetId = $(event.target).attr('id'); // id of element where item comes from
            var currentId = $('#'+id).parent().attr('id'); // id of curent element where item belongs to
            var id = ui.item.context.id;
            console.log('on moved: ', id, targetId, currentId);
        }
    }).disableSelection();
    
}

