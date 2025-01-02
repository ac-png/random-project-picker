fetch('projects.json')
  .then(response => response.json())
  .then(projects => {
    const projectList = document.getElementById('project-list');
    const searchTitleInput = document.getElementById('search-title');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const frameworkFilter = document.getElementById('framework-filter');
    const languageFilter = document.getElementById('language-filter');
    const pickProjectButton = document.getElementById('pick-project-btn');

    const renderProjects = (filteredProjects) => {
      projectList.innerHTML = '';
      
      if (filteredProjects.length === 0) {
        projectList.innerHTML = `<p>No projects found!</p>`;
      } else {
        filteredProjects.forEach(project => {
          const projectCard = document.createElement('div');
          projectCard.classList.add('card', 'mb-3');
          projectCard.innerHTML = `
            <div class="card-body">
              <h5 class="card-title">${project.name}</h5>
              <p class="card-text">${project.description}</p>
              <p class="card-text"><small class="text-muted">Difficulty: ${project.difficulty} | Framework: ${project.framework} | Language: ${project.language}</small></p>
            </div>
          `;
          projectList.appendChild(projectCard);
        });
      }
    };

    const filterProjects = () => {
      const searchTerm = searchTitleInput.value.toLowerCase();
      const difficulty = difficultyFilter.value;
      const framework = frameworkFilter.value;
      const language = languageFilter.value;

      const filteredProjects = projects.filter(project => {
        const matchesSearchTerm = project.name.toLowerCase().includes(searchTerm);
        const matchesDifficulty = difficulty ? project.difficulty === difficulty : true;
        const matchesFramework = framework ? project.framework.includes(framework) : true;
        const matchesLanguage = language ? project.language.includes(language) : true;

        return matchesSearchTerm && matchesDifficulty && matchesFramework && matchesLanguage;
      });

      renderProjects(filteredProjects);
    };

    searchTitleInput.addEventListener('input', filterProjects);
    difficultyFilter.addEventListener('change', filterProjects);
    frameworkFilter.addEventListener('change', filterProjects);
    languageFilter.addEventListener('change', filterProjects);

    const pickRandomProject = () => {
      const randomProject = projects[Math.floor(Math.random() * projects.length)];
      renderProjects([randomProject]);
    };

    pickProjectButton.addEventListener('click', pickRandomProject);

    renderProjects(projects);
  })
  .catch(error => {
    console.error('Error loading projects:', error);
  });
