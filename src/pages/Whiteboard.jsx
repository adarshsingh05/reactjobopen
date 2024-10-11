import React from 'react'

import '../App.css';
import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css';


const Whiteboard = () => {
    return (
        <div>
            
          <div style={{position:'fixed',
            inset: 0
          }}>
            <Tldraw/>
    
          </div>
        </div>
        
      )
}

export default Whiteboard
