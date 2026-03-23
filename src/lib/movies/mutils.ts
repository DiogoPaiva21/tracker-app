type CrewPerson = {
  job: string
  name: string
}

export const getCrewImportance = (job: string) => {
  switch (job) {
    case 'Director':
      return 120

    case 'Producer':
      return 110
    case 'Executive Producer':
      return 105
    case 'Co-Producer':
      return 104
    case 'Line Producer':
      return 103
    case 'Unit Production Manager':
      return 102

    case 'Writer':
    case 'Screenplay':
    case 'Story':
      return 100

    case 'Director of Photography':
    case 'Cinematography':
      return 95

    case 'Editor':
      return 90

    case 'Production Design':
      return 85
    case 'Art Direction':
      return 84
    case 'Set Decoration':
      return 83

    case 'Original Music Composer':
    case 'Composer':
      return 82
    case 'Music Supervisor':
      return 81

    case 'Casting':
      return 80

    case 'Costume Design':
      return 79
    case 'Makeup Artist':
    case 'Makeup Department Head':
    case 'Key Makeup Artist':
      return 78
    case 'Hairstylist':
    case 'Key Hair Stylist':
      return 77

    case 'Sound Re-Recording Mixer':
    case 'Supervising Sound Editor':
    case 'Production Sound Mixer':
      return 76

    case 'First Assistant Director':
      return 75
    case 'Second Assistant Director':
    case 'Second Second Assistant Director':
    case 'Additional Second Assistant Director':
    case 'Third Assistant Director':
      return 74

    case 'Visual Effects Supervisor':
    case 'Special Effects Supervisor':
      return 73
    case 'Stunt Coordinator':
      return 72
    case 'Choreographer':
      return 71

    case 'Camera Operator':
      return 70
    case 'Still Photographer':
      return 69

    default:
      return 0
  }
}

export const sortCrew = <T extends CrewPerson>(crew: Array<T>) => {
  return [...crew].sort((a, b) => {
    const importanceCompare =
      getCrewImportance(b.job) - getCrewImportance(a.job)
    if (importanceCompare !== 0) return importanceCompare

    const jobCompare = a.job.localeCompare(b.job)
    if (jobCompare !== 0) return jobCompare

    return a.name.localeCompare(b.name)
  })
}
