// FIXME: onClick function I made means that map re-renders every time pathname changes again...one way to fix is to not allow clicking on markers and instead highlight the associated sidebar tab???
// import { useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// export function useMapLayerClick() {
//   const navigate = useNavigate();
//   const pathname = useRef(useLocation().pathname);
//   return (e) => {
//     const { id, type } = e.features[0].properties;
//     const newPath = pathname.current.includes('radio')
//       ? `radio/${type}s/${id}`
//       : `${type}s/${id}`;
//     // const newPath = `${type}s/${id}`;
//     return navigate(newPath);
//   };
// }
