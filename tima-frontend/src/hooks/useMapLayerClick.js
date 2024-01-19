// FIXME: onClick function I made means that map re-renders every time pathname changes again...one way to fix is to not allow clicking on markers and instead highlight the associated sidebar tab???
// import { useLocation, useNavigate } from 'react-router-dom';

// export function useMapLayerClick() {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   return (e) => {
//     const { id, type } = e.features[0].properties;
//     const newPath = pathname.includes('radio')
//       ? `radio/${type}s/${id}`
//       : `${type}s/${id}`;

//     navigate(newPath);
//   };
// }
