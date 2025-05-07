export default function SkillsDisplay({ skills }) {
  if (!skills || skills.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500">
          No skills have been added to your profile yet.
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Complete courses to automatically add skills to your profile.
        </p>
      </div>
    );
  }

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="mb-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {categorySkills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill.name}
                {skill.proficiency && (
                  <span className="ml-1 text-xs text-blue-600">
                    • {skill.proficiency}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
