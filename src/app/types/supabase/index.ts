export type User = {
  id: number,
  name: string,
  icon_path: string
  posses: Posse,
  generations: Generation,
  statuses: Status[],
}

export type Posse = {
  posse: number,
}

export type Generation = {
  generation: number,
}

export type Status = {
  date: string,
  is_entered: boolean,
  scheduled_time_to_leave: string,
  comment: string,
  places: Place,
  working_statuses: WorkingStatus,
}

export type Place = {
  place: string,
}

export type WorkingStatus = {
  status: string,
}
