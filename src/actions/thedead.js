export const fetchTheDeadWorks = (mammals) => {
  return {
    type: 'FETCH_THEDEAD_WORKS',
    mammals
  };
};
export const strollCementary = (query, mammals) => {
  return{
  type: 'STROLL_CEMENTARY',
  mammals,
  query
  }
}