
var projects = [
    {
        name: 'Boids',
        repo: 'boids',
        desc: 'flocking simulation'
    },
    {
        name: '3D Particle Renderer',
        repo: '3d-space',
        desc: 'use wasd and ijkl to control camera',
        
    }
    {
        name: 'Spring Mass Mesh',
        repo: 'spring-mass-sim',
        desc: 'push around with cursor'
    },
]

async function loadData(project){
    var table = document.getElementById('list');
    var finishedList = [];

    for (let i = 0; i < projects.length; i++){
        currentProject = projects[i];

        var response = await fetch(`https://api.github.com/repos/sliuson/${currentProject.repo}/commits`);
        var data = await response.json();
        currentProject.lastModified = data[0].commit.committer.date;
        finishedList.push(currentProject);
    }
    finishedList.sort(function(a,b){return new Date(b.lastModified) - new Date(a.lastModified)});
    html = "";
    for (let i = 0; i < finishedList.length; i++){
        var project = finishedList[i];
        var date = project.lastModified.substring(0,10);
        html += `
        <tr>
            <td>${project.name}</td>
            <td>${date}</td>
            <td>${project.desc}</td>
            <td>
            <a href="https://sliuson.github.io/${project.repo}" target="_blank">[demo]</a>
            <a href="https://github.com/sliuson/${project.repo}" target="_blank">[source]</a>

            </td>
        </tr>`;
        table.innerHTML = html;
    }
    

    
}
loadData();