import { tmdbRequest } from '../client'
import { TmdbPersonDetails } from '../types'

export const getPersonDetails = async (id: string) => {
  return tmdbRequest<TmdbPersonDetails>(`/person/${id}?append_to_response=combined_credits`)
}
