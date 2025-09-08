const darkThemeStyles = {
  table: {
    style: {
      backgroundColor: '#534b4b',
      color: '#eee',
    }
  },
  headCells: {
    style: {
      backgroundColor: '#1f1f1f',
      color: '#eee',
      fontWeight: 'bold',
      textAlign: 'center',
      paddingLeft: '5px',
      paddingRight: '0px',
    }
  },
  rows: {
    style: {
      backgroundColor: '#333333',
      color: '#eee',
      '&:hover': {
        backgroundColor: '#333',
      },
      textAlign: 'left',
      padding:"2px"
    }
  },
  cells: {
    style: {
      color: '#eee',
      whiteSpace: 'normal !important', 
      wordBreak: 'break-word !important',
      height: 'auto',
      textAlign: 'left',
      paddingLeft: '5px',
      paddingRight: '0px',
      minWidth: '150px !important'
    }
  },
  pagination: {
    style: {
      backgroundColor: '#797575ff',
      color: '#333232ff',
    }
  }
};

export default darkThemeStyles;