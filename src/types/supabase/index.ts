export type User = {
  id: number,
  auth_id: string,
  name: string,
  icon_path: string
  posses: Posse,
  generations: Generation,
  statuses: Status[],
}

export type Posse = {
  id: number,
  posse: number,
}

export type Generation = {
  id: number,
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
  id: number,
  place: string,
}

export type WorkingStatus = {
  id: number,
  status: string,
}
