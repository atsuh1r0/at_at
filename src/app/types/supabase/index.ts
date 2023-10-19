// 今は利用していない

type User = {
  id: number,
  name: string,
  posses: Posse,
  generations: Generation,
  statuses: Status,
}

type Posse = {
  posse: number,
}

type Generation = {
  generation: number,
}

type Status = {
  is_entered: boolean,
  scheduled_time_to_leave: string,
  comment: string,
  places: Place,
  working_statuses: Status,
}

type Place = {
  place: string,
}

type WorkingStatus = {
  status: string,
}
