import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Button from '@material-ui/core/Button'

const pxToMm = px => {
  return Math.floor(px / document.getElementById('myMm').offsetHeight)
}

const mmToPx = mm => {
  return document.getElementById('myMm').offsetHeight * mm
}

const range = (start, end) => {
  return Array(end - start)
    .join(0)
    .split(0)
    .map((val, id) => {
      return id + start
    })
}

const PrintToPdfButton = ({ id, label }) => (
  <div>
    <div id="myMm" style={{ height: '1mm' }} />

    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        const input = document.getElementById(id)
        const inputHeightMm = pxToMm(input.offsetHeight)
        const a4WidthMm = 210
        const a4HeightMm = 297
        const a4HeightPx = mmToPx(a4HeightMm)
        const numPages =
          inputHeightMm <= a4HeightMm
            ? 1
            : Math.floor(inputHeightMm / a4HeightMm) + 1
        console.log({
          input,
          inputHeightMm,
          a4HeightMm,
          a4HeightPx,
          numPages,
          range: range(0, numPages),
          comp: inputHeightMm <= a4HeightMm,
          inputHeightPx: input.offsetHeight
        })

        html2canvas(input).then(canvas => {
          const imgData = canvas.toDataURL('image/png')

          const pdf = new jsPDF('p', 'mm', [inputHeightMm + 36, a4WidthMm + 96])

          pdf.addImage(imgData, 'PNG', 0, 0)
          pdf.save('my-sustainable-development-goals-profile.pdf')
        })
      }}
    >
      {label}
    </Button>
  </div>
)
export default PrintToPdfButton
