// import React, { useState, useEffect } from 'react';
// import './Content.css';
// import {
//   Button, Modal, CircularProgress, TextField, Typography, Box,
//   Paper, IconButton
// } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from 'react-router-dom';

// export default function Content() {
//   const [tutorial, setTutorial] = useState('');
//   const [sections, setSections] = useState([{ entries: [{ heading: '', title: '', content: '', images: [] }] }]);
//   const [articles, setArticles] = useState([]);
//   const [selectModalOpen, setSelectModalOpen] = useState(false);
//   const [formModalOpen, setFormModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedArticles = JSON.parse(localStorage.getItem('allArticles'));
//     if (storedArticles) setArticles(storedArticles);
//   }, []);

//   const handleOpen = () => {
//     setTutorial('');
//     setSections([{ entries: [{ heading: '', title: '', content: '', images: [] }] }]);
//     setEditIndex(null);
//     setSelectModalOpen(true);
//   };

//   const handleSelectionContinue = () => {
//     if (!tutorial.trim()) return alert('Please enter a tutorial name!');
//     setSelectModalOpen(false);
//     setFormModalOpen(true);
//   };

//   const handleFormClose = () => {
//     setFormModalOpen(false);
//     setTutorial('');
//     setSections([{ entries: [{ heading: '', title: '', content: '', images: [] }] }]);
//     setEditIndex(null);
//   };

//   const handleEntryChange = (secIndex, entryIndex, field, value) => {
//     const updated = [...sections];
//     updated[secIndex].entries[entryIndex][field] = value;
//     setSections(updated);
//   };

//   const handleImageChange = (secIndex, entryIndex, files) => {
//     const updated = [...sections];
//     const fileArray = Array.from(files);
//     updated[secIndex].entries[entryIndex].images = fileArray;
//     setSections(updated);
//   };

//   const addSection = () => {
//     setSections([...sections, { entries: [{ heading: '', title: '', content: '', images: [] }] }]);
//   };

//   const addEntryToSection = (secIndex) => {
//     const updated = [...sections];
//     updated[secIndex].entries.push({ heading: '', title: '', content: '', images: [] });
//     setSections(updated);
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const newArticle = {
//       tutorial,
//       contents: sections.map((sec) => ({
//         entries: sec.entries.map((entry) => ({
//           heading: entry.heading,
//           title: entry.title,
//           content: entry.content,
//           images: entry.images.map((img) =>
//             typeof img === 'string' ? img : URL.createObjectURL(img)
//           ),
//         })),
//       })),
//     };

//     let updatedArticles = [...articles];
//     if (editIndex !== null) {
//       updatedArticles[editIndex] = newArticle;
//     } else {
//       updatedArticles.push(newArticle);
//     }

//     setArticles(updatedArticles);
//     localStorage.setItem('allArticles', JSON.stringify(updatedArticles));
//     setLoading(false);
//     handleFormClose();
//   };

//   const handleEdit = (index) => {
//     const article = articles[index];
//     setTutorial(article.tutorial);
//     setSections(
//       article.contents.map((sec) => ({
//         entries: sec.entries.map((entry) => ({
//           heading: entry.heading,
//           title: entry.title,
//           content: entry.content,
//           images: entry.images,
//         })),
//       }))
//     );
//     setEditIndex(index);
//     setFormModalOpen(true);
//   };

//   const handleDelete = (index) => {
//     const updated = [...articles];
//     updated.splice(index, 1);
//     setArticles(updated);
//     localStorage.setItem('allArticles', JSON.stringify(updated));
//   };

//   return (
//     <Box className="content-wrapper" p={3}>
//       <Typography variant="h5" gutterBottom>Add New Content</Typography>
//       <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleOpen} sx={{ mb: 3 }}>
//         Add Article
//       </Button>

//       {articles.length === 0 ? (
//         <Typography>No articles found. Please add a new article.</Typography>
//       ) : (
//         articles.map((article, index) => (
//           <Paper elevation={3} sx={{ p: 2, mb: 3 }} key={index}>
//             <Typography variant="h6">Tutorial: {article.tutorial}</Typography>
//             {article.contents.map((section, secIndex) => (
//               <Box key={secIndex}>
//                 <Typography variant="subtitle1">Section {secIndex + 1}</Typography>
//                 {section.entries.map((entry, entryIndex) => (
//                   <Box key={entryIndex} mb={2}>
//                     {entry.heading && <Typography><strong>Heading:</strong> {entry.heading}</Typography>}
//                     {entry.title && <Typography><strong>Title:</strong> {entry.title}</Typography>}
//                     {entry.content && <Typography><strong>Content:</strong> {entry.content}</Typography>}
//                     {entry.images.length > 0 && (
//                       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                         {entry.images.map((img, i) => (
//                           <img key={i} src={img} alt="uploaded" style={{ width: 100, borderRadius: 4 }} />
//                         ))}
//                       </Box>
//                     )}
//                   </Box>
//                 ))}
//               </Box>
//             ))}
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <IconButton color="primary" onClick={() => handleEdit(index)}><EditIcon /></IconButton>
//               <IconButton color="error" onClick={() => handleDelete(index)}><DeleteIcon /></IconButton>
//             </Box>
//           </Paper>
//         ))
//       )}

//       {/* Modal: Tutorial Name */}
//       <Modal open={selectModalOpen} onClose={() => setSelectModalOpen(false)}>
//         <Box className="modal-container">
//           <Typography variant="h6">Enter Tutorial Name</Typography>
//           <TextField
//             fullWidth
//             value={tutorial}
//             onChange={(e) => setTutorial(e.target.value)}
//             placeholder="Tutorial Name"
//           />
//           <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
//             <Button onClick={() => setSelectModalOpen(false)}>Cancel</Button>
//             <Button variant="contained" onClick={handleSelectionContinue} disabled={!tutorial.trim()}>
//               Continue
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Modal: Content Form */}
//       <Modal open={formModalOpen} onClose={handleFormClose}>
//         <Box className="modal-container" component="form" onSubmit={handleSave}>
//           <Typography variant="h6">{editIndex !== null ? 'Edit Article' : 'Add Article'}</Typography>
//           <Typography variant="subtitle1" mt={2}>Tutorial Name: <strong>{tutorial}</strong></Typography>

//           {sections.map((section, secIndex) => (
//             <Box key={secIndex} mt={3}>
//               <Typography variant="subtitle2">Section {secIndex + 1}</Typography>
//               {section.entries.map((entry, entryIndex) => (
//                 <Paper key={entryIndex} variant="outlined" sx={{ p: 2, mt: 1 }}>
//                   <TextField
//                     label="Heading"
//                     fullWidth
//                     margin="normal"
//                     value={entry.heading}
//                     onChange={(e) => handleEntryChange(secIndex, entryIndex, 'heading', e.target.value)}
//                   />
//                   <TextField
//                     label="Title"
//                     fullWidth
//                     margin="normal"
//                     value={entry.title}
//                     onChange={(e) => handleEntryChange(secIndex, entryIndex, 'title', e.target.value)}
//                   />
//                   <TextField
//                     label="Content"
//                     fullWidth
//                     margin="normal"
//                     multiline
//                     rows={3}
//                     value={entry.content}
//                     onChange={(e) => handleEntryChange(secIndex, entryIndex, 'content', e.target.value)}
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={(e) => handleImageChange(secIndex, entryIndex, e.target.files)}
//                   />
//                 </Paper>
//               ))}
//               <Button onClick={() => addEntryToSection(secIndex)} sx={{ mt: 1 }}>Add Entry</Button>
//             </Box>
//           ))}
//           <Button onClick={addSection} sx={{ mt: 2 }}>Add Section</Button>
//           <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
//             <Button onClick={handleFormClose}>Cancel</Button>
//             <Button variant="contained" type="submit" disabled={loading}>
//               {loading ? <CircularProgress size={24} /> : 'Save'}
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }
 
import React, { useState, useEffect } from 'react';
import './Content.css';
import {
  Button, Modal, CircularProgress, Typography, Box, Paper, IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function Content() {
  const [tutorial, setTutorial] = useState('');
  const [sections, setSections] = useState([{ entries: [{ heading: '', title: '', content: '', images: [] }] }]);
  const [articles, setArticles] = useState([]);
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem('allArticles'));
    if (storedArticles) setArticles(storedArticles);
  }, []);

  const handleOpen = () => {
    setTutorial('');
    setSections([{ entries: [{ heading: '', title: '', content: '', images: [] }] }]);
    setEditIndex(null);
    setSelectModalOpen(true);
  };

  const handleSelectionContinue = () => {
    if (!tutorial.trim()) return alert('Please enter a tutorial name!');
    setSelectModalOpen(false);
    setFormModalOpen(true);
  };

  const handleFormClose = () => {
    setFormModalOpen(false);
    setTutorial('');
    setSections([{ entries: [{ heading: '', title: '', content: '', images: [] }] }]);
    setEditIndex(null);
  };

  const handleEntryChange = (secIndex, entryIndex, field, value) => {
    const updated = [...sections];
    updated[secIndex].entries[entryIndex][field] = value;
    setSections(updated);
  };

  const handleImageChange = (secIndex, entryIndex, files) => {
    const updated = [...sections];
    const fileArray = Array.from(files);
    updated[secIndex].entries[entryIndex].images = fileArray;
    setSections(updated);
  };

  const addSection = () => {
    setSections([...sections, { entries: [{ heading: '', title: '', content: '', images: [] }] }]);
  };

  const addEntryToSection = (secIndex) => {
    const updated = [...sections];
    updated[secIndex].entries.push({ heading: '', title: '', content: '', images: [] });
    setSections(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const newArticle = {
      tutorial,
      contents: sections.map((sec) => ({
        entries: sec.entries.map((entry) => ({
          heading: entry.heading,
          title: entry.title,
          content: entry.content,
          images: entry.images.map((img) =>
            typeof img === 'string' ? img : URL.createObjectURL(img)
          ),
        })),
      })),
    };

    let updatedArticles = [...articles];
    if (editIndex !== null) {
      updatedArticles[editIndex] = newArticle;
    } else {
      updatedArticles.push(newArticle);
    }

    setArticles(updatedArticles);
    localStorage.setItem('allArticles', JSON.stringify(updatedArticles));
    setLoading(false);
    handleFormClose();
  };

  const handleEdit = (index) => {
    const article = articles[index];
    setTutorial(article.tutorial);
    setSections(
      article.contents.map((sec) => ({
        entries: sec.entries.map((entry) => ({
          heading: entry.heading,
          title: entry.title,
          content: entry.content,
          images: entry.images,
        })),
      }))
    );
    setEditIndex(index);
    setFormModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = [...articles];
    updated.splice(index, 1);
    setArticles(updated);
    localStorage.setItem('allArticles', JSON.stringify(updated));
  };

  return (
    <Box className="content-wrapper" p={3}>
      <Typography variant="h5" gutterBottom>Add New Content</Typography>
      <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleOpen} sx={{ mb: 3 }}>
        Add Article
      </Button>

      {articles.length === 0 ? (
        <Typography>No articles found. Please add a new article.</Typography>
      ) : (
        articles.map((article, index) => (
          <Paper elevation={3} sx={{ p: 2, mb: 3 }} key={index}>
            <Typography variant="h6">Tutorial: {article.tutorial}</Typography>
            {article.contents.map((section, secIndex) => (
              <Box key={secIndex}>
                <Typography variant="subtitle1">Section {secIndex + 1}</Typography>
                {section.entries.map((entry, entryIndex) => (
                  <Box key={entryIndex} mb={2}>
                    {entry.heading && <Typography><strong>Heading:</strong> {entry.heading}</Typography>}
                    {entry.title && <Typography><strong>Title:</strong> {entry.title}</Typography>}
                    {entry.content && <Typography><strong>Content:</strong> {entry.content}</Typography>}
                    {entry.images.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                        {entry.images.map((img, i) => (
                          <img key={i} src={img} alt="uploaded" style={{ width: 100, borderRadius: 4 }} />
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            ))}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton color="primary" onClick={() => handleEdit(index)}><EditIcon /></IconButton>
              <IconButton color="error" onClick={() => handleDelete(index)}><DeleteIcon /></IconButton>
            </Box>
          </Paper>
        ))
      )}

      {/* Modal: Tutorial Name */}
      <Modal open={selectModalOpen} onClose={() => setSelectModalOpen(false)}>
        <Box className="modal-container">
          <Typography variant="h6">Enter Tutorial Name</Typography>
          <input
            type="text"
            value={tutorial}
            onChange={(e) => setTutorial(e.target.value)}
            placeholder="Tutorial Name"
            style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
          />
          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => setSelectModalOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSelectionContinue} disabled={!tutorial.trim()}>
              Continue
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal: Content Form */}
      <Modal open={formModalOpen} onClose={handleFormClose}>
        <Box className="modal-container" component="form" onSubmit={handleSave}>
          <Typography variant="h6">{editIndex !== null ? 'Edit Article' : 'Add Article'}</Typography>
          <Typography variant="subtitle1" mt={2}>Tutorial Name: <strong>{tutorial}</strong></Typography>

          {sections.map((section, secIndex) => (
            <Box key={secIndex} mt={3}>
              <Typography variant="subtitle2">Section {secIndex + 1}</Typography>
              {section.entries.map((entry, entryIndex) => (
                <Paper key={entryIndex} variant="outlined" sx={{ p: 2, mt: 1 }}>
                  <input
                    type="text"
                    value={entry.heading}
                    onChange={(e) => handleEntryChange(secIndex, entryIndex, 'heading', e.target.value)}
                    placeholder="Heading"
                    style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
                  />
                  <input
                    type="text"
                    value={entry.title}
                    onChange={(e) => handleEntryChange(secIndex, entryIndex, 'title', e.target.value)}
                    placeholder="Title"
                    style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
                  />
                  <textarea
                    value={entry.content}
                    onChange={(e) => handleEntryChange(secIndex, entryIndex, 'content', e.target.value)}
                    placeholder="Content"
                    style={{ width: '100%', padding: '8px', marginBottom: '8px', minHeight: '80px' }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageChange(secIndex, entryIndex, e.target.files)}
                    style={{ marginBottom: '8px' }}
                  />
                </Paper>
              ))}
              <Button onClick={() => addEntryToSection(secIndex)} sx={{ mt: 1 }}>Add Entry</Button>
            </Box>
          ))}
          <Button onClick={addSection} sx={{ mt: 2 }}>Add Section</Button>
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleFormClose}>Cancel</Button>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
